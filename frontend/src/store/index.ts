import { configureStore } from '@reduxjs/toolkit';
import vacationsReducer from '../components/Vacations/vacationsSlice';

const store = configureStore({
  reducer: {
    vacationsState: vacationsReducer,
  },
});

//Infer the "RootState" and "AppDispatch" types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
