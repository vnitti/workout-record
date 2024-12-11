import { createSlice } from '@reduxjs/toolkit';

/**
 * The initial state of the slice. In this case, an empty array.
 * In this array we are going to store all our routines.
 */
const initialState = {
  routines: [],
};

/**
 * Reducers are functions that change the state.
 * As we are using RTK, we don't need to manually create the action of this reducer
 * since these are created automatically by createSlice().
 */

/*
  In this case, one example of the action would look like this:
  {
    type: 'routine/addRoutine',
    payload: {
      name: 'routineName',
      exercises: [
        { id: '00001', name: 'Push ups', type: 'Strenght' },
        { id: '00002', name: 'Squats', type: 'Endurance' },
      ]
    }
  }
 */

const routineSlice = createSlice({
  name: 'routine', // name of the slice.
  initialState, // initial state of the slice.
  reducers: { // object containing all the reducers. In this case, only one.
    // RTK automatically asigns the value of the state to the argument state, we don't have to do it manually.
    addRoutine: (state, action) => { // this reducer will be the one which updates the state of routines array.
      state.routines.push(action.payload); // payload property contains the new routine to be pushed.
    },
  },
});

export const { addRoutine } = routineSlice.actions;
export default routineSlice.reducer;