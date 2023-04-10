import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  autos: [],
};

const autoSlice = createSlice({
  name: "auto",
  initialState,
  reducers: {
    STORE_AUTOS(state, action) {
      state.autos = action.payload.autos;
    },
  },
});

export const { STORE_AUTOS } = autoSlice.actions;

export const selectAutos = (state) => state.auto.autos;

export default autoSlice.reducer;
