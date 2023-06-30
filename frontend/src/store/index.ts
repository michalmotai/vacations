import { configureStore } from '@reduxjs/toolkit';
import vacationsReducer from '../components/Vacations/vacationsSlice';
import authReducer from '../auth/authSlice';

const store = configureStore({
  reducer: {
    vacationsState: vacationsReducer,
    authState: authReducer,
  },
});

//Infer the "RootState" and "AppDispatch" types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
