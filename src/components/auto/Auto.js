import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { 
  selectAutos, 
  STORE_AUTOS,
  GET_PRICE_RANGE,
  GET_MILEAGE_RANGE,
} from "../../redux/slice/autoSlice";
import "./auto.scss";
import AutoFilter from "./autoFilter/AutoFilter";
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
    dispatch(
      GET_PRICE_RANGE({
        autos: data,
      })
    );
    dispatch(
      GET_MILEAGE_RANGE({
        autos: data,
      })
    );
  }, [dispatch, data]);

  return (
    <div className="container">
      <div className="auto py-4">
        <div className="filter">
          <AutoFilter />
        </div>         
          {isLoading && <Loader />}
            <AutoList autos={autos} />
      </div>
    </div>
  );
};

export default Auto;