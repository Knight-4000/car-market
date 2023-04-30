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
      <div className="grid md:grid-cols-2 lg:grid-cols-1">
        <h4 className="text-center">Categories</h4>
      
      <div className="flex flex-col justify-center items-center">
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
        <div>
      <h4 className="text-center">Make</h4>
      </div>
      <div className="flex flex-col justify-center items-center">
      <select value={make} onChange={(e) => setMake(e.target.value)}>
          {allMakes.map((make, index) => {
            return (
              <option key={index} value={make}>
                {make}
              </option>
            );
          })}
        </select>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-1">
        <h4 className="text-center">Price</h4>
        <p className="text-center">{`$${price}`}</p>
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
        <h4 className="text-center">Mileage</h4>
        <p className="text-center">{`${mileage}`}</p>
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
        </div>
        <br />
        <button className="btn filter-button px-3 py-3" onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>
 
  );
};

export default AutoFilter;