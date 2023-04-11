import React, { useState } from "react";
import './autolist.scss';
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";

const AutoList = () => {
  const [grid, setGrid] = useState(true);

  return (
    <div className="auto-list" id="auto">
      <div className="top">
        <div className="icons">
          <BsFillGridFill
            size={22}
            color="##FF2400"
            onClick={() => setGrid(true)}
          />

          <FaListAlt size={24} color="#0066d4" 
          onClick={() => setGrid(false)} />

          <p>
            <b>10</b> Vehicles found.
          </p>
        </div>
        {/* Search Icon */}
        <div>
          <p>Search</p>
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
    </div>
  );
};

export default AutoList;