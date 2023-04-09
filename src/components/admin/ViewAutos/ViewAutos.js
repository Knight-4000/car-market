import { useState, useEffect } from 'react'
import { 
  collection,
  onSnapshot,
  orderBy,
  query,
} from '@firebase/firestore';
import { db } from "../../../firebase/config";
import { toast } from 'react-toastify';
import './ViewAutos.scss';

const ViewAutos = () => {
  const [autos, setAutos] = useState([])
  const [isLoading, setIsLoading] = useState((false))

  useEffect(() => {
    getAutos();
  }, []);

  const getAutos = () => {
    setIsLoading(true)

    try {
      const autosRef = collection(db, "autos")
      const q = query(autosRef, orderBy("createdAt", "desc"));
      // const q = query(autosRef, orderBy("name", "desc"), limit(6));

      onSnapshot(q, (snapshot) => {
        const allAutos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAutos(allAutos);
        setIsLoading(false);
      });

    } catch(error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  };
  return (
    <>
      <div className='table'>
        <h2 className='text-center'>Our Latest Rides</h2>
          {autos.length === 0 ? (
            <p>No vehicles in inventory.</p>

          ) : (
          <table>
           <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Make</th>
                <th>Model</th>
                <th>Mileage</th>
                <th>Price</th>
              </tr>
            </thead>
            {autos.map((auto, index) => {
              const { id, price, imageURL, category, make, model, mileage } = auto;
              return (
                <tbody>
                  <tr key={id}>
                    <td></td>
                    <td>
                      <img
                        src={imageURL}
                        alt={model}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{make}</td>
                    <td>{model}</td>
                    <td>{category}</td>
                    <td>{mileage}</td>
                    <td>{}</td>
                    <td>{`$${price}`}</td>
                  </tr>
                </tbody>
              );
            })}

          </table>

          )}
      </div>
      
    </>
  )
}

export default ViewAutos
