import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, Image, Alert} from 'react-native';
import {Text, Button, TextInput, Avatar, Surface} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store';
import {theme} from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MovieCard from '../components/MovieCard';
import {updateProfile} from '../store/userSlice';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const profile = useSelector((state: RootState) => state.user.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    dispatch(updateProfile(editedProfile));
    setIsEditing(false);
    Alert.alert('Başarılı', 'Profil bilgileri güncellendi');
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Surface
        mode="elevated"
        elevation={2}
        style={{
          backgroundColor: theme.colors.surface,
          padding: 16,
          margin: 16,
          borderRadius: 12,
        }}>
        <View style={{alignItems: 'center', marginBottom: 16}}>
          <Avatar.Image
            size={80}
            source={{uri: profile.avatar || 'https://via.placeholder.com/80'}}
          />
          <TouchableOpacity
            style={{position: 'absolute', right: 0, top: 0}}
            onPress={() => setIsEditing(!isEditing)}>
            <Icon name="pencil" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {isEditing ? (
          <View>
            <TextInput
              mode="outlined"
              label="Ad Soyad"
              value={editedProfile.name}
              onChangeText={text =>
                setEditedProfile(prev => ({...prev, name: text}))
              }
              style={{marginBottom: 12}}
            />
            <TextInput
              mode="outlined"
              label="E-posta"
              value={editedProfile.email}
              onChangeText={text =>
                setEditedProfile(prev => ({...prev, email: text}))
              }
              style={{marginBottom: 12}}
            />
            <TextInput
              mode="outlined"
              label="Biyografi"
              value={editedProfile.bio}
              onChangeText={text =>
                setEditedProfile(prev => ({...prev, bio: text}))
              }
              multiline
              numberOfLines={3}
              style={{marginBottom: 16}}
            />
            <Button mode="contained" onPress={handleSave}>
              Kaydet
            </Button>
          </View>
        ) : (
          <View>
            <Text
              variant="titleLarge"
              style={{color: theme.colors.text, textAlign: 'center'}}>
              {profile.name}
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.secondaryText,
                textAlign: 'center',
                marginTop: 4,
              }}>
              {profile.email}
            </Text>
            {profile.bio && (
              <Text
                variant="bodyMedium"
                style={{
                  color: theme.colors.text,
                  textAlign: 'center',
                  marginTop: 12,
                  fontStyle: 'italic',
                }}>
                {profile.bio}
              </Text>
            )}
          </View>
        )}
      </Surface>

      <View style={{padding: 16}}>
        <Text
          variant="titleMedium"
          style={{color: theme.colors.text, marginBottom: 12}}>
          Favori Filmlerim ({favorites.length})
        </Text>
        {favorites.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {favorites.length === 0 && (
          <Text
            style={{
              color: theme.colors.secondaryText,
              textAlign: 'center',
              marginTop: 20,
            }}>
            Henüz favori film eklemediniz.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen; 