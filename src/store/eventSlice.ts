import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  name: string;
  _id: string;
}

export interface Event {
  name: string;
  _id: string;
}

// Define the initial state using that type
const initialState: CounterState = {
  name: "",
  _id: "",
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<Event>) {
      const { name, _id } = action.payload;
      state.name = name;
      state._id = _id;
    },
  },
});

export const { addEvent } = eventSlice.actions;

export default eventSlice.reducer;
