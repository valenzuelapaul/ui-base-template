import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';

type ProfileProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: any;
};

type ProfileStateProps = {
  value: ProfileProps;
  isLoading: boolean;
  error: string | null;
};

export const initialState: ProfileStateProps = {
  value: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProfileData } = profileSlice.actions;

export const selectProfileData = (state: RootState) => state.profile;

export default profileSlice.reducer;
