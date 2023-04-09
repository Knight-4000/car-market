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
      <div>

      </div>
      
    </>
  )
}

export default ViewAutos
