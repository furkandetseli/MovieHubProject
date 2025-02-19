import React, {useState, useCallback, useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import {Searchbar, ActivityIndicator} from 'react-native-paper';
import MovieCard from '../components/MovieCard';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {theme} from '../theme/index';
import {searchMovies} from '../store/movieSlice';
import {useDebounce} from '../hooks/useDebounce';

const SearchScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState('');
  const {movies, loading} = useSelector((state: RootState) => state.movies);
  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(searchMovies(debouncedQuery));
    }
  }, [debouncedQuery, dispatch]);

  const normalizeText = (text: string | undefined) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const normalizedQuery = normalizeText(query);
    
    const filtered = movies.filter(movie => {
      const normalizedTitle = normalizeText(movie.title);
      const normalizedDirector = normalizeText(movie.director);
      const normalizedGenres = movie.genre.map(g => normalizeText(g));
      
      return (
        normalizedTitle.includes(normalizedQuery) ||
        normalizedDirector.includes(normalizedQuery) ||
        normalizedGenres.some(genre => genre.includes(normalizedQuery))
      );
    });
  };

  const filteredMovies = movies.filter(movie => {
    const normalizedTitle = normalizeText(movie.title);
    const normalizedQuery = normalizeText(searchQuery);
    return normalizedTitle.includes(normalizedQuery);
  });

  // Sonuçları önce puana göre sırala
  const sortedMovies = [...filteredMovies].sort((a, b) => {
    // Önce rating'e göre sırala (yüksek rating üstte)
    if (a.rating !== b.rating) {
      return b.rating - a.rating;
    }

    // Rating'ler eşitse, yeni filmleri üste koy
    return b.year - a.year;
  });

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Searchbar
        placeholder="Film ara..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{
          margin: 16,
          backgroundColor: theme.colors.surface,
          elevation: 2,
        }}
        iconColor={theme.colors.primary}
        inputStyle={{color: theme.colors.text}}
        placeholderTextColor={theme.colors.secondaryText}
      />
      {loading ? (
        <ActivityIndicator
          style={{marginTop: 20}}
          size="large"
          color={theme.colors.primary}
        />
      ) : (
        <FlatList
          data={sortedMovies}
          renderItem={({item}) => <MovieCard movie={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingVertical: 8}}
          ListEmptyComponent={() =>
            searchQuery ? (
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: 20,
                  color: theme.colors.secondaryText,
                }}>
                Film bulunamadı
              </Text>
            ) : null
          }
        />
      )}
    </View>
  );
};

export default SearchScreen; 