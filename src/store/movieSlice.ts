import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Movie} from '../types/movie';
import {api} from '../api/api';

interface MovieState {
  movies: Movie[];
  favorites: Movie[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasMorePages: boolean;
}

const initialState: MovieState = {
  movies: [] as Movie[],
  favorites: [] as Movie[],
  loading: false,
  error: null,
  currentPage: 1,
  hasMorePages: true,
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (page: number) => {
    try {
      const movies = await api.fetchMovies(page);
      return {movies, page};
    } catch (error) {
      throw error;
    }
  },
);

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (query: string, {rejectWithValue}) => {
    try {
      const movies = await api.searchMovies(query);
      return movies;
    } catch (error) {
      return rejectWithValue('Film araması yapılırken hata oluştu.');
    }
  }
);

export const fetchTopMovies = createAsyncThunk(
  'movies/fetchTopMovies',
  async () => {
    const response = await fetch('https://api.example.com/top-movies');
    const data = await response.json();
    return data;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (movie) => movie.id !== action.payload
      );
    },
    resetMovies: state => {
      state.movies = [];
      state.currentPage = 1;
      state.hasMorePages = true;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const {movies, page} = action.payload;
        if (page === 1) {
          state.movies = movies;
        } else {
          state.movies = [...state.movies, ...movies];
        }
        state.currentPage = page;
        state.hasMorePages = movies.length > 0;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Bir hata oluştu';
      })
      .addCase(searchMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {addFavorite, removeFavorite, resetMovies} = movieSlice.actions;
export default movieSlice.reducer; 