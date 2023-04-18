import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  autos: [],
  minPrice: null,
  maxPrice: null,
};

const autoSlice = createSlice({
  name: "auto",
  initialState,
  reducers: {
    STORE_AUTOS(state, action) {
      state.autos = action.payload.autos;
    },
    GET_PRICE_RANGE(state, action) {
      const { autos } = action.payload;
      const array = [];
      autos.map((auto) => {
        const price = auto.price;
        return array.push(price);
      });
      const max = Math.max(...array);
      const min = Math.min(...array);

      state.minPrice = min;
      state.maxPrice = max;
    },
  },
});

export const { STORE_AUTOS, GET_PRICE_RANGE } = autoSlice.actions;

export const selectAutos = (state) => state.auto.autos;
export const selectMinPrice = (state) => state.auto.minPrice;
export const selectMaxPrice = (state) => state.auto.maxPrice;

export default autoSlice.reducer;
