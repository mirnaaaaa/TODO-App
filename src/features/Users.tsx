import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: { id: "", displayName: "" } };

 const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value.id = action.payload.id;
      state.value.displayName = action.payload.displayName;
    },
    Logout: (state) => {
      state.value = initialState.value;
    }
  }
});
export const { addUser, Logout } = UserSlice.actions;

export default UserSlice.reducer;
