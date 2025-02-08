import {Movie} from '../types/movie';

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    year: 2010,
    poster: 'https://example.com/inception.jpg',
    rating: 4.8,
    genre: ['Action', 'Sci-Fi'],
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
  },
  {
    id: '2',
    title: 'The Dark Knight',
    year: 2008,
    poster: 'https://example.com/thedarkknight.jpg',
    rating: 4.9,
    genre: ['Action', 'Crime', 'Drama'],
    description: 'When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
  },
]; 