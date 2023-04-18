import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { selectAutos, STORE_AUTOS } from "../../redux/slice/autoSlice";
import "./auto.scss";
import AutoFilter from "./autoFilter/AutoFilter";
import AutoItem from "./autoItem/AutoItem";
import AutoList from "./autoList/AutoList";
import Loader from "../loader/Loader";



const Auto = () => {
  const { data, isLoading } = useFetchCollection("autos");
  const autos = useSelector(selectAutos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_AUTOS({
        autos: data,
      })
    );
  }, [dispatch, data]);

  return (
    <section>
      <div className="auto">
        <aside className="filter">
           <AutoFilter />    
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