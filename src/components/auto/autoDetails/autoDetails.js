import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import Loader from "../../loader/Loader";
import Auto from "../Auto";
import './autodetails.scss';

const AutoDetails = () => {
  const {id} = useParams()

  const [auto, setAuto] = useState(null);

  const getAuto = async () => {
    const docRef = doc(db, "autos", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      setAuto(obj);
    } else {
      toast.error("Auto not found");
    }
  };

  useEffect(() => {
    getAuto();
  }, [])
  return (
    <>
      <div className="container auto">
         <div>
           <Link to="/#autos"> Back To Autos</Link>
         </div>
         {auto === null ? (
           <Loader alt="Loading" style={{ width: "50px" }} />
         ) : (
           <>
             <div className="details">
               <div className="">
                 <img src={auto.imageURL} alt={auto.make} />
               </div>
               <div className="content">
                 <h2 className="text-center">{auto.model}</h2>
                 <p className="price">{`$${auto.price}`}</p>
                 <p>{auto.desc}</p>
                 <p>
                   <b>SKU</b> {auto.id}
                 </p>
                 <button className="btn">Place Order</button>
               </div>
             </div>
           </>
         )}
       </div>
    </>
  )
}

export default AutoDetails
