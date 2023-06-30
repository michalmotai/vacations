import { AUTH_LOGIN_STORAGE_KEY } from '../config';
import User from '../models/User';
import jwtDecode from 'jwt-decode';
import { AuthState } from './authSlice';
import { setAuthHeader } from '../axios/utils';

export const setInitialAuthState = (): AuthState => {
  // Take the token from the session storage (if exists)
  const token = sessionStorage.getItem(AUTH_LOGIN_STORAGE_KEY);
  let user = null;

  if (token) {
    // setAuthHeaders
    const container: { user: User } = jwtDecode(token);
    user = container.user;
    setAuthHeader(token);
  }

  return {
    user,
    token,
  };
};

export const handleToken = (state: AuthState, token: string) => {
  //set token
  state.token = token;

  //jwtDecode is an object and user is part of it.
  const container: { user: User } = jwtDecode(token);
  state.user = container.user;
  //set Auth headers
  setAuthHeader(token);

  sessionStorage.setItem(AUTH_LOGIN_STORAGE_KEY, token);
};
