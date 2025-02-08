import React from 'react';
import {View, ScrollView, Image, Dimensions, TouchableOpacity, Share} from 'react-native';
import {Text, IconButton, Surface} from 'react-native-paper';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {theme} from '../theme/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addFavorite, removeFavorite} from '../store/movieSlice';
import LinearGradient from 'react-native-linear-gradient';

type RootStackParamList = {
  MovieDetail: {movieId: string};
};

type MovieDetailScreenRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

const {width} = Dimensions.get('window');

const MovieDetailScreen = () => {
  const route = useRoute<MovieDetailScreenRouteProp>();
  const dispatch = useDispatch<AppDispatch>();
  const {movieId} = route.params;
  
  const movie = useSelector((state: RootState) =>
    state.movies.movies.find(m => m.id === movieId)
  );
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const isFavorite = favorites.some(fav => fav.id === movieId);

  if (!movie) return null;

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <View>
        <Image
          source={{uri: movie.poster}}
          style={{
            width: width,
            height: width * 1.5,
            resizeMode: 'cover',
          }}
        />
        <LinearGradient
          colors={['transparent', 'rgba(15, 23, 42, 0.9)']}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
          }}
        />
      </View>

      <Surface
        mode="elevated"
        elevation={2}
        style={{
          backgroundColor: theme.colors.surface,
          margin: 16,
          borderRadius: 12,
          padding: 16,
          marginTop: -40,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <View style={{flex: 1}}>
            <Text
              variant="headlineMedium"
              style={{color: theme.colors.text, fontWeight: 'bold', marginBottom: 4}}>
              {movie.title}
            </Text>
            <Text
              variant="bodyLarge"
              style={{color: theme.colors.secondaryText}}>
              {movie.director?.split('•')[0]}
            </Text>
            <Text
              variant="bodyLarge"
              style={{color: theme.colors.secondaryText}}>
              {movie.year}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={toggleFavorite}
              style={{padding: 8, marginRight: 8}}>
              <Icon
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? theme.colors.error : theme.colors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Share.share({
                  message: `${movie.title} (${movie.year}) - ${movie.description}`,
                  title: movie.title,
                });
              }}
              style={{padding: 8}}>
              <Icon
                name="share-variant"
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 12}}>
          <Icon name="star" size={20} color={theme.colors.primary} />
          <Text
            variant="bodyLarge"
            style={{color: theme.colors.primary, marginLeft: 4, fontWeight: '600'}}>
            {movie.rating}/10
          </Text>
        </View>

        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16}}>
          {movie.genre.map((g, index) => (
            <View
              key={`${movie.id}-${g}-${index}`}
              style={{
                backgroundColor: theme.colors.accent,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                marginRight: 8,
                marginBottom: 8,
              }}>
              <Text style={{color: theme.colors.text, fontSize: 14}}>
                {g}
              </Text>
            </View>
          ))}
        </View>

        <Text
          variant="bodyLarge"
          style={{
            color: theme.colors.text,
            lineHeight: 24,
          }}>
          {movie.description}
        </Text>

      </Surface>
    </ScrollView>
  );
};

export default MovieDetailScreen; 