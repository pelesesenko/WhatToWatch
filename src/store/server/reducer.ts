import {createSlice} from '@reduxjs/toolkit';
import {serverAvailabilityChecked} from '../extra-actions';

interface State {
  isAvailable: boolean;
}

const initialState: State = {
  isAvailable: true
};

const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(serverAvailabilityChecked, (state, action) => {
        state.isAvailable = action.payload;
      });
  }
});

export default serverSlice.reducer;
