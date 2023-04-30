import React, { useEffect, useState } from "react";
import './autolist.scss';
import Search from "../../search/Search";
import AutoItem from "../autoItem/AutoItem";
import { useDispatch, useSelector } from "react-redux";
 import {
   FILTER_BY_SEARCH,
   selectFilteredAutos,
   SORT_AUTOS,
   FILTER_BY_MAKE,
   FILTER_BY_CATEGORY,
 } from "../../../redux/slice/filterSlice";
 import {
  selectMaxPrice,
  selectMinPrice,
  selectMaxMileage,
  selectMinMileage,
  selectAutos,
} from "../../../redux/slice/autoSlice";

import Pagination from "../../pagination/Pagination";
import AutoFilter from "../autoFilter/AutoFilter";

const AutoList = ({autos}) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredAutos = useSelector(selectFilteredAutos);
  const [category, setCategory] = useState("All");
  const [make, setMake] = useState("All");
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const [price, setPrice] = useState(100000);
  const [mileage, setMileage] = useState(200000);
  const minMileage = useSelector(selectMinMileage);
  const maxMileage = useSelector(selectMaxMileage);

  const dispatch = useDispatch();

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [autosPerPage, setAutosPerPage] = useState(3);
    // Get Current Autos
    const indexOfLastAuto = currentPage * autosPerPage;
    const indexOfFirstAuto = indexOfLastAuto - autosPerPage;
    const currentAutos = filteredAutos.slice(
      indexOfFirstAuto,
      indexOfLastAuto
    );

    const allCategories = [
      "Categories",
      ...new Set(autos.map((auto) => auto.category)),
    ];

    const allMakes = [
      "Makes",
      ...new Set(autos.map((auto) => auto.make)),
    ];
  useEffect(() => {
    dispatch(FILTER_BY_MAKE({ autos, make }));
  }, [dispatch, autos, make]);

  useEffect(() => {
    dispatch(SORT_AUTOS({ autos, sort }));
  }, [dispatch, autos, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ autos, search }));
  }, [dispatch, autos, search]);

  useEffect(() => {
    dispatch(FILTER_BY_CATEGORY({ autos, category }));
  }, [dispatch, autos, category]);

  const filterAutos = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ autos, category: cat }));
  };

  return (
    <div className="container">
      <div className="auto-list">
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4 place-items-center">
          <div>         
            <p>
              <b className="px-1">{filteredAutos.length}</b> 
              Vehicles found
            </p>
          </div>
          <div className="search-bar">          
            <Search value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
            <div className="sort-large flex flex-row ">
            <p className="text-center pl-1">Sort By:</p>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="latest">Latest</option>
                <option value="lowest-price">Lowest Price</option>
                <option value="highest-price">Highest Price</option>
                <option value="a-z">A - Z</option>
                <option value="z-a">Z - A</option>
              </select>
              </div>
          </div>
          <div className="mobile-filter">
            <div className="grid grid-cols-3 gap-2 place-items-center">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {allCategories.map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            );
          })}
        </select> 
        <select value={make} onChange={(e) => setMake(e.target.value)}>
          {allMakes.map((make, index) => {
            return (
              <option key={index} value={make}>
                {make}
              </option>
            );
          })}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="latest">Latest</option>
                <option value="lowest-price">Lowest Price</option>
                <option value="highest-price">Highest Price</option>
                <option value="a-z">A - Z</option>
                <option value="z-a">Z - A</option>
              </select>
        
        </div>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4 place-items-center">
          {currentAutos.map((auto) => {
                return (
                  <div key={auto.id}>
                    <AutoItem {...auto} 
                      auto={auto}
                    />
                  </div>
                )
              })}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        autosPerPage={autosPerPage}
        totalAutos={filteredAutos.length}
      />
    </div> 
  );
};

export default AutoList;