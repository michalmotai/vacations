import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../models/User';
import { handleToken, setInitialAuthState } from './utils';
import { AUTH_LOGIN_STORAGE_KEY } from '../config';
import Vacation from '../models/Vacation';

export interface AuthState {
  user: User | null;
  token: string | null;
  likedVacations: Vacation[];
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: setInitialAuthState(),
  reducers: {
    register: (state, { payload: token }: PayloadAction<string>) => {
      handleToken(state, token);
    },
    login: (state, { payload: token }: PayloadAction<string>) => {
      handleToken(state, token);
    },
    logout: (state) => {
      //remove token
      state.token = null;
      state.user = null;
      sessionStorage.removeItem(AUTH_LOGIN_STORAGE_KEY);
    },
    setLikedVacations: (
      state,
      { payload: likedVacations }: PayloadAction<Vacation[]>
    ) => {
      if (state.user) {
        state.user.likedVacations = [...likedVacations];
      }
    },
    userLikedVacation: (
      state,
      { payload: vacation }: PayloadAction<Vacation>
    ) => {
      if (state.user) {
        // Check if the vacation is already liked
        const isLiked = state.user.likedVacations.some(
          (likedVacation) => likedVacation.vacationId === vacation.vacationId
        );

        if (!isLiked) {
          state.user.likedVacations.push(vacation);
          console.log('user liked vacation');
        }
      }
    },

    userUnlikeVacation: (
      state,
      { payload: vacation }: PayloadAction<Vacation>
    ) => {
      if (state.user) {
        state.user.likedVacations = state.user.likedVacations.filter(
          (likedVacation) => likedVacation.vacationId !== vacation.vacationId
        );
        console.log('user unliked vacation');
      }
    },
  },
});

export const {
  register,
  login,
  logout,
  setLikedVacations,
  userLikedVacation,
  userUnlikeVacation,
} = authSlice.actions;

export default authSlice.reducer;
