import { configureStore } from '@reduxjs/toolkit';
import routineReducer from './routineSlice';

/**
  In the variable store, we centralize the global state.
  Here we store all the reducers (in all the slices) of our proyect.
  When we access to the global state, we access here first and then we access to the slices.
*/

const store = configureStore({ // configureStore serves the same purpose as createStore() in Redux.
  reducer: { // reducer object is the only mandatory property in store. It contains all the reducers in the project
    routine: routineReducer, // routine is currently the only reducer in the project.
  },
});

export default store;