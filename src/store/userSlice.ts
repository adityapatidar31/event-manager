import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "./store";

interface CounterState {
  name: string;
  role: "user" | "guide" | "lead-guide" | "admin";
  _id: string;
  email: string;
  photo: string;
}

export interface User {
  name: string;
  role: "user" | "guide" | "lead-guide" | "admin";
  _id: string;
  email: string;
  photo?: string;
}

// Define the initial state using that type
const initialState: CounterState = {
  name: "",
  role: "user",
  _id: "",
  email: "",
  photo: "user.jpeg",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      const { name, _id, email, role, photo } = action.payload;
      // console.log(name, id, email, role, photo);
      state.name = name;
      state._id = _id;
      state.email = email;
      state.role = role;
      state.photo = photo || state.photo;
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
