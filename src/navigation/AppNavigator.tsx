import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform, StyleSheet} from 'react-native';
import {theme} from '../theme/index';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type RootStackParamList = {
  MovieDetail: {
    movieId: string;
    movie: {
      title: string;
    };
  };
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: 'transparent',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: -2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            },
            android: {
              elevation: 8,
            },
          }),
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        headerStyle: {
          backgroundColor: theme.colors.surface,
          ...Platform.select({
            ios: {
              shadowOpacity: 0,
            },
            android: {
              borderBottomWidth: 0,
            },
          }),
        },
        headerTintColor: theme.colors.text,
      }}>
      <Tab.Screen
        name="Ana Sayfa"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Icon 
              name="home" 
              color={color} 
              size={focused ? size + 4 : size} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="Ara"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Icon 
              name="magnify" 
              color={color} 
              size={focused ? size + 4 : size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Icon 
              name="account" 
              color={color} 
              size={focused ? size + 4 : size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.surface,
          text: theme.colors.text,
          border: theme.colors.border,
          notification: theme.colors.primary,
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '700',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '900',
          },
        },
      }}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
            ...Platform.select({
              ios: {
                shadowOpacity: 0,
              },
              android: {
                borderBottomWidth: 0,
              },
            }),
          },
          headerTintColor: theme.colors.text,
        }}>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="MovieDetail" 
          component={MovieDetailScreen}
          options={({ route }) => ({
            title: (route.params as RootStackParamList['MovieDetail']).movie?.title || 'Film Detayı',
            headerTransparent: true,
            headerTintColor: '#fff'
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 