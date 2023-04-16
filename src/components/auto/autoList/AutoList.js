import React, { useState } from "react";
import './autolist.scss';
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";
import AutoItem from "../autoItem/AutoItem";


const AutoList = ({autos}) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <div className="auto-list" id="auto">
      <div className="top">
        <div className="icons">
          <BsFillGridFill
            size={22}
            color="#FF2400"
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={24} color="#0066d4" 
          onClick={() => setGrid(false)} />
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
        <div className={grid ? 'grid' : 'list'}>
          <>
          {autos.map((auto) => {
            return (
              <div key={auto.id}>
                <AutoItem {...auto} grid={grid}
                  auto={auto}
                />
              </div>
            )
          })}
          </>

        </div>
      </div>
    </div>
  );
};

export default AutoList;