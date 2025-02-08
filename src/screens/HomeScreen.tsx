import React, {useState, useEffect} from 'react';
import {View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import {Text} from 'react-native-paper';
import MovieCard from '../components/MovieCard';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {theme} from '../theme/index';
import {fetchMovies, resetMovies, fetchTopMovies} from '../store/movieSlice';

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {movies, loading, hasMorePages, currentPage} = useSelector(
    (state: RootState) => state.movies,
  );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchMovies(1));
  }, []);

  // Filmleri puana göre sırala
  const sortedMovies = [...movies].sort((a, b) => {
    // Önce rating'e göre sırala (yüksek rating üstte)
    if (a.rating !== b.rating) {
      return b.rating - a.rating;
    }
    // Rating'ler eşitse, yeni filmleri üste koy
    return b.year - a.year;
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(resetMovies());
    await dispatch(fetchMovies(1));
    setRefreshing(false);
  };

  const loadMoreMovies = () => {
    if (!loading && hasMorePages) {
      dispatch(fetchMovies(currentPage + 1));
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        style={{padding: 20}}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <FlatList
        data={sortedMovies}
        renderItem={({item}) => <MovieCard movie={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingVertical: 8}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={() =>
          !loading ? (
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
    </View>
  );
};

export default HomeScreen; 