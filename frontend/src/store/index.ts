import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../counter/counterSlice';


const store = configureStore({
    reducer: {
        counter: counterReducer,

    }
});


//Infer the "RootState" and "AppDispatch" types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
