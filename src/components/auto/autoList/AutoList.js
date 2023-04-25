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
import Pagination from "../../pagination/Pagination";

const AutoList = ({autos}) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredAutos = useSelector(selectFilteredAutos);

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

  useEffect(() => {
    dispatch(SORT_AUTOS({ autos, sort }));
  }, [dispatch, autos, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ autos, search }));
  }, [dispatch, autos, search]);

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
          <div>          
            <Search value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div>
            <label>Sort by:</label>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="latest">Latest</option>
                <option value="lowest-price">Lowest Price</option>
                <option value="highest-price">Highest Price</option>
                <option value="a-z">A - Z</option>
                <option value="z-a">Z - A</option>
              </select>
          </div>
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