export interface Movie {
  id: string;
  title: string;
  year: number;
  director?: string; // optional director field
  poster: string;
  rating: number;
  genre: string[];
  description: string;
} 