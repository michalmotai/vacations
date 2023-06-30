import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../models/User';
import { handleToken, setInitialAuthState } from './utils';
import { AUTH_LOGIN_STORAGE_KEY } from '../config';

export interface AuthState {
  user: User | null;
  token: string | null;
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
  },
});

export const { register, login, logout } = authSlice.actions;

export default authSlice.reducer;
