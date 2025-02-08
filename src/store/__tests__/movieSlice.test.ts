import movieReducer, {
  addToFavorites,
  removeFromFavorites,
  resetMovies,
} from '../movieSlice';

describe('movieSlice', () => {
  const initialState = {
    movies: [],
    favorites: [],
    loading: false,
    error: null,
    currentPage: 1,
    hasMorePages: true,
  };

  const mockMovie = {
    id: '1',
    title: 'Test Movie',
    year: 2023,
    poster: 'test.jpg',
    rating: 8.5,
    genre: ['Action'],
    description: 'Test description',
  };

  it('should handle initial state', () => {
    expect(movieReducer(undefined, {type: 'unknown'})).toEqual(initialState);
  });

  it('should handle addToFavorites', () => {
    const actual = movieReducer(initialState, addToFavorites(mockMovie));
    expect(actual.favorites).toEqual([mockMovie]);
  });

  it('should handle removeFromFavorites', () => {
    const stateWithFavorite = {
      ...initialState,
      favorites: [mockMovie],
    };
    const actual = movieReducer(
      stateWithFavorite,
      removeFromFavorites(mockMovie.id),
    );
    expect(actual.favorites).toEqual([]);
  });

  it('should handle resetMovies', () => {
    const stateWithMovies = {
      ...initialState,
      movies: [mockMovie],
      currentPage: 2,
    };
    const actual = movieReducer(stateWithMovies, resetMovies());
    expect(actual).toEqual(initialState);
  });
}); 