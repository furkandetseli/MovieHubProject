import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store';
import {fetchMovies, resetMovies} from '../store/movieSlice';
import {mockMovies} from '../data/mockMovies';

export const useMovies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {movies, loading, error} = useSelector((state: RootState) => state.movies);

  const loadMovies = useCallback(() => {
    dispatch(fetchMovies(1));
  }, [dispatch]);

  return {movies, loading, error, loadMovies};
}; 