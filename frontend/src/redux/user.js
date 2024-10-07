import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    init(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export default configureStore({
  reducer: {
    user: user.reducer,
  },
});

export let { init } = user.actions;
