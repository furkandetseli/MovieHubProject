import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Profile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
}

interface UserState {
  profile: Profile;
}

const initialState: UserState = {
  profile: {
    name: 'Kullanıcı Adı',
    email: 'kullanici@email.com',
    bio: 'Film tutkunuyum 🎬',
    avatar: 'https://via.placeholder.com/80',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
  },
});

export const {updateProfile} = userSlice.actions;
export default userSlice.reducer; 