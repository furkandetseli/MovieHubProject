const API_KEY = '845ddc0e6ef4a1ce02c58a6fb30c5687'; // TMDB'den aldığınız API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  overview: string;
  genre_ids: number[];
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number;
  poster: string;
  description: string;
  genre: string[];
}

const transformMovie = (tmdbMovie: TMDBMovie): Movie => ({
  id: tmdbMovie.id.toString(),
  title: tmdbMovie.title,
  year: new Date(tmdbMovie.release_date).getFullYear(),
  rating: Math.round(tmdbMovie.vote_average * 10) / 10,
  poster: `${IMAGE_BASE_URL}${tmdbMovie.poster_path}`,
  description: tmdbMovie.overview,
  genre: [], // Genre bilgisini ayrı bir API çağrısıyla alacağız
});

export const api = {
  getTopMovies: async (page = 1): Promise<Movie[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      const data = await response.json();
      return data.results.map(transformMovie);
    } catch (error) {
      console.error('Error fetching top movies:', error);
      throw error;
    }
  },

  getMovieDetails: async (movieId: string): Promise<Movie> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      return transformMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          query
        )}&page=1`
      );
      const data = await response.json();
      return data.results.map(transformMovie);
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },
}; 