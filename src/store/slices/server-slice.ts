import {createSlice} from '@reduxjs/toolkit';
import {serverAvailabilityChecked} from '../extra-actions';
import {RootState} from '../store';


interface State {
  isAvailable: boolean;
}

const initialState: State = {
  isAvailable: true
};

const serverSlice = createSlice({
  name: `server`,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(serverAvailabilityChecked, (state, action) => {
      state.isAvailable = action.payload;
    });
  }
});

export const {} = serverSlice.actions;

export const selectIsServerAvailable = (state: RootState) => state.server.isAvailable;

export default serverSlice.reducer;
