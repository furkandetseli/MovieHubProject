import {Movie} from '../types/movie';

const API_KEY = '845ddc0e6ef4a1ce02c58a6fb30c5687';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const api = {
  searchMovies: async (query: string): Promise<Movie[]> => {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=tr-TR&sort_by=vote_average.desc&vote_count.gte=1000`,
    );
    const data = await response.json();
    
    return data.results.map((movie: any) => ({
      id: movie.id.toString(),
      title: movie.title,
      year: new Date(movie.release_date).getFullYear(),
      poster: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
      rating: movie.vote_average,
      genre: [], // TMDB'den genre bilgisini ayrıca çekmek gerekiyor
      description: movie.overview,
    }));
  },

  fetchMovies: async (page: number): Promise<Movie[]> => {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&language=tr-TR&sort_by=vote_average.desc&vote_count.gte=1000&include_adult=false`,
    );
    const data = await response.json();
    
    return data.results.map((movie: any) => ({
      id: movie.id.toString(),
      title: movie.title,
      year: new Date(movie.release_date).getFullYear(),
      poster: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
      rating: movie.vote_average,
      genre: [],
      description: movie.overview,
    }));
  },
}; 