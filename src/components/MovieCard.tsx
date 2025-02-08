import React, {useCallback} from 'react';
import {View, Image, TouchableOpacity, Share} from 'react-native';
import {Text, IconButton, Surface} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite, removeFavorite} from '../store/movieSlice';
import {Movie} from '../types/movie';
import {RootState} from '../store';
import {styles, theme} from '../theme/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFavorites} from '../hooks/useFavorites';


type RootStackParamList = {
  MovieDetail: {movieId: string};
};

type MovieCardNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({movie}: MovieCardProps) => {
  const navigation = useNavigation<MovieCardNavigationProp>();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const {isFavorite: useFavoritesIsFavorite, toggleFavorite: useFavoritesToggleFavorite} = useFavorites();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${movie.title} (${movie.year}) - ${movie.description}`,
      });
    } catch (error) {
      console.error('Paylaşım hatası:', error);
    }
  };

  const toggleFavorite = useCallback(() => {
    if (useFavoritesIsFavorite(movie.id)) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  }, [dispatch, useFavoritesIsFavorite, movie]);

  return (
    <Surface
      mode="elevated"
      elevation={2}
      style={{
        backgroundColor: theme.colors.surface,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MovieDetail', {movieId: movie.id})}
        activeOpacity={0.9}
        style={{flexDirection: 'row', height: 150}}>
        <Image
          source={{uri: movie.poster}}
          style={{
            width: 100,
            height: '100%',
            resizeMode: 'cover',
          }}
        />
        <View style={{flex: 1, padding: 12}}>
          <View style={{flex: 1}}>
            <Text
              variant="titleMedium"
              style={{
                color: theme.colors.text,
                fontWeight: 'bold',
                marginBottom: 4,
              }}
              numberOfLines={2}>
              {movie.title}
            </Text>
            <Text
              variant="bodyMedium"
              style={{color: theme.colors.secondaryText, fontSize: 12}}>
              {movie.year}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 4}}>
              <IconButton
                icon="star"
                size={14}
                iconColor={theme.colors.primary}
                style={{margin: 0, marginRight: 2}}
              />
              <Text
                variant="bodyMedium"
                style={{color: theme.colors.primary, fontSize: 12}}>
                {movie.rating}/10
              </Text>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 4}}>
              {movie.genre.slice(0, 2).map((g, index) => (
                <Text
                  key={`${movie.id}-genre-${index}-${g}`}
                  style={{
                    backgroundColor: theme.colors.accent,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 12,
                    color: theme.colors.text,
                    fontSize: 10,
                  }}>
                  {g}
                </Text>
              ))}
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => toggleFavorite()}
              style={{padding: 8}}>
              <Icon
                name={useFavoritesIsFavorite(movie.id) ? 'heart' : 'heart-outline'}
                size={24}
                color={useFavoritesIsFavorite(movie.id) ? theme.colors.error : theme.colors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShare}
              style={{padding: 8}}>
              <Icon
                name="share-variant"
                size={18}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Surface>
  );
};

export default MovieCard; 