import React, { useState } from "react";
import './autolist.scss';
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";
import AutoItem from "../autoItem/AutoItem";


const AutoList = ({autos}) => {

  const [search, setSearch] = useState("");

  return (
    <div className="container">
    <div className="auto-list" id="auto">
      <div className="top">
        <div className="icons">

          <p>
            <b>10</b> Vehicles found.
          </p>
        </div>
        <div>
          <Search value={search} 
          onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className="">
          <label>Sort by:</label>
          <select>
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
              {autos.map((auto) => {
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