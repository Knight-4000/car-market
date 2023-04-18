import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { 
  selectAutos, 
  STORE_AUTOS,
  GET_PRICE_RANGE
} from "../../redux/slice/autoSlice";
import "./auto.scss";
import AutoFilter from "./autoFilter/AutoFilter";
import AutoItem from "./autoItem/AutoItem";
import AutoList from "./autoList/AutoList";
import Loader from "../loader/Loader";

const Auto = () => {
  const { data, isLoading } = useFetchCollection("autos");
  const autos = useSelector(selectAutos);
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_AUTOS({
        autos: data,
      })
    );
    dispatch(
      GET_PRICE_RANGE({
        autos: data,
      })
    );
  }, [dispatch, data]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section>
      <div className="auto">
      <aside
          className={
            showFilter ? 'filter show' : 'filter'
          }
        >
          {isLoading ? null : <AutoFilter />}
        </aside>
               
        <div className="">
          {isLoading && <Loader />}
            <AutoList autos={autos} />
        </div>
      </div>
    </section>
  );
};

export default Auto;