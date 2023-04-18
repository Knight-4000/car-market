import React, { useEffect, useState } from "react";
import './autolist.scss';
import Search from "../../search/Search";
import AutoItem from "../autoItem/AutoItem";
import { useDispatch, useSelector } from "react-redux";
 import {
   FILTER_BY_SEARCH,
   selectFilteredAutos,
   SORT_AUTOS,
 } from "../../../redux/slice/filterSlice";


const AutoList = ({autos}) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredAutos = useSelector(selectFilteredAutos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_AUTOS({ autos, sort }));
  }, [dispatch, autos, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ autos, search }));
  }, [dispatch, autos, search]);

  return (
    <div className="container">
    <div className="auto-list">
      <div className="top">
        <div className="icons">

          <p>
            <b>{filteredAutos.length}</b> Vehicles found.
          </p>
        </div>
        <div>
          <Search value={search} 
          onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className="">
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="mileage-sixty">Below 60K miles</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
        </div>
        <div className="">
          <>
          <div className="mx-auto">
            <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto px-4 py-4">
              {filteredAutos.map((auto) => {
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
          </>
        </div>
      </div>
    </div> 
  );
};

export default AutoList;