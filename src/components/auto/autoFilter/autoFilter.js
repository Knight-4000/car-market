import React from "react";
import "./autofilter.scss";

const AutoFilter = () => {
  return (
    <div className="">
      <h4>Categories</h4>
      <div className="">
        <button>All</button>
      </div>
      <h4>Make</h4>
      <div className="">
        <select name="">
          <option value="all">All</option>
        </select>
        <h4>Price</h4>
        <p>1500</p>
        <div className="">
          <input type="range" name="price" min="1000" max="100000" />
        </div>
        <br />
        <button className="btn">Clear Filter</button>
      </div>
    </div>
  );
};

export default AutoFilter;