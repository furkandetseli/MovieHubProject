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
    
    const moviesWithDetails = await Promise.all(
      data.results.map(async (movie: any) => {
        // Film detayları
        const detailsResponse = await fetch(
          `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&language=tr-TR`
        );
        const details = await detailsResponse.json();

        // Ekip bilgileri
        const creditsResponse = await fetch(
          `${BASE_URL}/movie/${movie.id}/credits?api_key=${API_KEY}`
        );
        const credits = await creditsResponse.json();
        
        // Yönetmen ve ana tür bilgisi
        const director = credits.crew.find((person: any) => person.job === 'Director')?.name;
        const mainGenre = details.genres[0]?.name || 'Bilinmiyor';

        return {
          id: movie.id.toString(),
          title: movie.title,
          year: new Date(movie.release_date).getFullYear(),
          director: `${director || 'Bilinmiyor'} • ${mainGenre}`,
          poster: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
          rating: movie.vote_average,
          genre: details.genres.map((g: any) => g.name),
          description: movie.overview,
        };
      })
    );

    return moviesWithDetails;
  },

  fetchMovies: async (page: number): Promise<Movie[]> => {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}&language=tr-TR&vote_count.gte=1000`,
    );
    const data = await response.json();
    
    const moviesWithDetails = await Promise.all(
      data.results.map(async (movie: any) => {
        // Film detayları
        const detailsResponse = await fetch(
          `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&language=tr-TR`
        );
        const details = await detailsResponse.json();

        // Ekip bilgileri
        const creditsResponse = await fetch(
          `${BASE_URL}/movie/${movie.id}/credits?api_key=${API_KEY}`
        );
        const credits = await creditsResponse.json();
        
        const director = credits.crew.find((person: any) => person.job === 'Director')?.name;
        const mainGenre = details.genres[0]?.name || 'Bilinmiyor';

        return {
          id: movie.id.toString(),
          title: movie.title,
          year: new Date(movie.release_date).getFullYear(),
          director: `${director || 'Bilinmiyor'} • ${mainGenre}`,
          poster: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
          rating: movie.vote_average,
          genre: details.genres.map((g: any) => g.name),
          description: movie.overview,
        };
      })
    );

    return moviesWithDetails;
  },
}; 