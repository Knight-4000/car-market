import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_MAKE,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";
import {
  selectMaxPrice,
  selectMinPrice,
  selectAutos,
} from "../../../redux/slice/autoSlice";
import "./autofilter.scss";

const AutoFilter = () => {
  const [category, setCategory] = useState("All");
  const [make, setMake] = useState("All");
  const [price, setPrice] = useState(100000);
  const autos = useSelector(selectAutos);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(autos.map((auto) => auto.category)),
  ];
  const allMakes = [
    "All",
    ...new Set(autos.map((auto) => auto.make)),
  ];


  useEffect(() => {
    dispatch(FILTER_BY_MAKE({ autos, make }));
  }, [dispatch, autos, make]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ autos, price }));
  }, [dispatch, autos, price]);

  useEffect(() => {
    dispatch(FILTER_BY_CATEGORY({ autos, category }));
  }, [dispatch, autos, category]);

  const filterAutos = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ autos, category: cat }));
  };

  const clearFilters = () => {
    setCategory("All");
    setMake("All");
    setPrice(maxPrice);
  };

  return (
    <div className="">
      <h4>Categories</h4>
      <div className="">
      {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === cat ? 'active' : null}
              onClick={() => filterAutos(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>
      <h4>Make</h4>
      <div className="">
      <select value={make} onChange={(e) => setMake(e.target.value)}>
          {allMakes.map((make, index) => {
            return (
              <option key={index} value={make}>
                {make}
              </option>
            );
          })}
        </select>
        <h4>Price</h4>
        <p>{`$${price}`}</p>
        <div className="price">
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <br />
        <button className="btn" onClick={clearFilters}>Clear Filter</button>
      </div>
    </div>
  );
};

export default AutoFilter;