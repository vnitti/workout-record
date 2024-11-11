import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  routines: [],
};

const routineSlice = createSlice({
  name: 'routine',
  initialState,
  reducers: {
    addRoutine: (state, action) => {
      state.routines.push(action.payload);
    },
  },
});

export const { addRoutine } = routineSlice.actions;
export default routineSlice.reducer;