import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  autos: [],
  minPrice: null,
  maxPrice: null,
  minMileage: null,
  maxMileage: null,
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
    GET_MILEAGE_RANGE(state, action) {
      const { autos } = action.payload;
      const array = [];
      autos.map((auto) => {
        const mileage = auto.mileage;
        return array.push(mileage);
      });
      const max = Math.max(...array);
      const min = Math.min(...array);

      state.minMileage = min;
      state.maxMileage = max;
    },
  },
});

export const { STORE_AUTOS, GET_PRICE_RANGE, GET_MILEAGE_RANGE } = autoSlice.actions;

export const selectAutos = (state) => state.auto.autos;
export const selectMinPrice = (state) => state.auto.minPrice;
export const selectMaxPrice = (state) => state.auto.maxPrice;
export const selectMinMileage = (state) => state.auto.minMileage;
export const selectMaxMileage = (state) => state.auto.maxMileage;

export default autoSlice.reducer;
