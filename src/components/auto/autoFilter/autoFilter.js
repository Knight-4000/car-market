import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_MAKE,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  FILTER_BY_MILEAGE,
} from "../../../redux/slice/filterSlice";
import {
  selectMaxPrice,
  selectMinPrice,
  selectMaxMileage,
  selectMinMileage,
  selectAutos,
} from "../../../redux/slice/autoSlice";
import "./autofilter.scss";

const AutoFilter = () => {
  const [category, setCategory] = useState("All");
  const [make, setMake] = useState("All");
  const [price, setPrice] = useState(100000);
  const [mileage, setMileage] = useState(200000);
  const autos = useSelector(selectAutos);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const minMileage = useSelector(selectMinMileage);
  const maxMileage = useSelector(selectMaxMileage);

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
    dispatch(FILTER_BY_MILEAGE({ autos, mileage }));
  }, [dispatch, autos, mileage]);


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
    //setMileage("100000");
    setPrice(maxPrice);
    setMileage(maxMileage);
    //setPrice("100000");
  };

  return (
    <div className="selector">
      <h4>Categories</h4>
      <div>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {allCategories.map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            );
          })}
        </select>  
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
            className="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <h4>Mileage</h4>
        <p>{`${mileage}`}</p>
        <div className="price">
          <input
            type="range"
            className="range"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            min={minMileage}
            max={maxMileage}
          />
        </div>
        <br />
        <button className="btn filter-button px-7 py-3" onClick={clearFilters}>Clear Filters</button>
      </div>
    </div>
  );
};

export default AutoFilter;