import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store';
import {addToFavorites, removeFromFavorites} from '../store/movieSlice';
import {Movie} from '../types/movie';

export const useFavorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.movies.favorites);

  const isFavorite = useCallback(
    (movieId: string) => favorites.some(fav => fav.id === movieId),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (movie: Movie) => {
      if (isFavorite(movie.id)) {
        dispatch(removeFromFavorites(movie.id));
      } else {
        dispatch(addToFavorites(movie));
      }
    },
    [dispatch, isFavorite],
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}; 