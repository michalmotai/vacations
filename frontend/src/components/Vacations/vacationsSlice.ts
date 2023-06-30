import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Vacation from '../../models/Vacation';
import { format } from 'date-fns';

interface VacationState {
  vacations: Vacation[];
  vacation?: Vacation;
}

const initialState: VacationState = {
  vacations: [],
};

export const vacationsSlice = createSlice({
  name: 'vacations',
  initialState: initialState,
  reducers: {
    setVacations: (state, action: PayloadAction<Vacation[]>) => {
      //const { type, payload } = action;

      //Redux toolkit alloes us to write "mutating" state (using immer library)
      //we don't mutate the state, Immer does the change behind the scenes

      state.vacations = action.payload;

      //different way to write it:

      //setVacations: (state, {payload as vacations} PayloadAction<Vacation[]>) => {
      // state.vacations = vacations;
    },

    setVacation: (state, action: PayloadAction<Vacation>) => {
      const { payload } = action; // payload ===vacation
      state.vacation = payload;
  
    },
    onAddVacation: (state, { payload: vacation }: PayloadAction<Vacation>) => {
      state.vacations.push(vacation);
    },
    onUpdateVacation: (
      state,
      { payload: vacation }: PayloadAction<Vacation>
    ) => {
      //find index of desired vaction
      const indexToUpdate = state.vacations.findIndex(
        (v) => v.vacationId === vacation.vacationId
      );

      if (indexToUpdate >= 0) {
        state.vacations[indexToUpdate] = vacation;
      }
    },

    onDeleteVacation: (state, { payload: id }: PayloadAction<number>) => {
      const indexToDelete = state.vacations.findIndex(
        (v) => v.vacationId === id
      );

      if (indexToDelete >= 0) {
        state.vacations.splice(indexToDelete, 1);
      }
    },
  },
});

export const {
  setVacations,
  setVacation,
  onAddVacation,
  onDeleteVacation,
  onUpdateVacation,
} = vacationsSlice.actions;
export default vacationsSlice.reducer;
