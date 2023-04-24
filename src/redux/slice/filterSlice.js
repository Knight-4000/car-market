import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredAutos: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { autos, search } = action.payload;
      const tempAutos = autos.filter(
        (auto) =>
          auto.model.toLowerCase().includes(search.toLowerCase()) ||
          auto.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredAutos = tempAutos;
    },
    SORT_AUTOS(state, action) {
      const { autos, sort } = action.payload;
      let tempAutos = [];
      if (sort === "latest") {
        tempAutos = autos;
      }

      if (sort === "lowest-price") {
        tempAutos = autos.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }

      if (sort === "highest-price") {
        tempAutos = autos.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }

      if (sort === "a-z") {
        tempAutos = autos.slice().sort((a, b) => {
          return a.model.localeCompare(b.model);
        });
      }
      if (sort === "z-a") {
        tempAutos = autos.slice().sort((a, b) => {
          return b.model.localeCompare(a.model);
        });
      }

      state.filteredProducts = tempAutos;
    },
    FILTER_BY_CATEGORY(state, action) {
      const { autos, category } = action.payload;
      let tempAutos = [];
      if (category === "All") {
        tempAutos = autos;
      } else {
        tempAutos = autos.filter(
          (auto) => auto.category === category
        );
      }
      state.filteredAutos = tempAutos;
    },
    FILTER_BY_MAKE(state, action) {
      const { autos, make } = action.payload;
      let tempAutos = [];
      if (make === "All") {
        tempAutos = autos;
      } else {
        tempAutos = autos.filter((auto) => auto.make === make);
      }
      state.filteredAutos = tempAutos;
    },
    FILTER_BY_PRICE(state, action) {
      const { autos, price } = action.payload;
      let tempAutos = [];
      tempAutos = autos.filter((auto) => auto.price <= price);

      state.filteredAutos = tempAutos;
    },
    FILTER_BY_MILEAGE(state, action) {
      const { autos, mileage } = action.payload;
      let tempAutos = [];
      tempAutos = autos.filter((auto) => auto.mileage <= mileage);

      state.filteredAutos = tempAutos;
    },
  },
});

export const {
  FILTER_BY_SEARCH,
  SORT_AUTOS,
  FILTER_BY_CATEGORY,
  FILTER_BY_MAKE,
  FILTER_BY_PRICE,
  FILTER_BY_MILEAGE,
} = filterSlice.actions;

export const selectFilteredAutos = (state) => state.filter.filteredAutos;

export default filterSlice.reducer;