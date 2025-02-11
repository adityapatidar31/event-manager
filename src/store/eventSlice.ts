import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EventState {
  name: string;
  _id: string;
}

export interface Event {
  name: string;
  _id: string;
}

const initialState: EventState = {
  name: "",
  _id: "",
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    joinEvent(state, action: PayloadAction<Event>) {
      const { name, _id } = action.payload;
      state.name = name;
      state._id = _id;
    },
    leaveEvent(state) {
      state.name = "";
      state._id = "";
    },
  },
});

export const { joinEvent, leaveEvent } = eventSlice.actions;
export default eventSlice.reducer;
