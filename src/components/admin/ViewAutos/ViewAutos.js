import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import './ViewAutos.scss';
import Loader from "../../loader/Loader";

const ViewAutos = () => {
  const [autos, setAutos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAutos();
  }, []);

  const getAutos = () => {
    setIsLoading(true);

    try {
      const autosRef = collection(db, "autos");
      const q = query(autosRef, orderBy("createdAt", "desc"));

      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allAutos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allAutos);
        setAutos(allAutos);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="table">
        <h2>All Products</h2>

        {autos.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            {autos.map((auto, index) => {
          
              return (
                <tbody>
                  <tr key={auto.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={auto.imageURL}
                        alt={auto.make}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{auto.make}</td>
                    <td>{auto.category}</td>
                    <td>{auto.price}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
      </div>
    </>
  );
};

export default ViewAutos;