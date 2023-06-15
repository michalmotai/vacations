import { createSlice, PayloadAction } from '@reduxjs/toolkit';





export interface CounterState {
    counter: number ;
}

const counterState:CounterState = {
    counter:0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState: counterState,
    reducers: {
        increase: (state, {payload}:PayloadAction<void>) => {
            state.counter = state.counter + 1;
        },
        decrease: (state, {payload}:PayloadAction<void>) => {

            state.counter = (state.counter === 0) ? 0 : state.counter + -1;
        },
    }
});

// export the action creators
export const { increase, decrease } = counterSlice.actions;

export default counterSlice.reducer;


