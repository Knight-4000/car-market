import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../../../firebase/config";
import './ViewAutos.scss';

export default function Autos({auto, id}) {
  const [autos, setAutos] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAutos() {
      const autosRef = collection(db, "autos");
      const q = query(autosRef, orderBy("timestamp", "desc"));
      const querySnap = await getDocs(q);
      let autos = [];
      querySnap.forEach((doc) => {
        return autos.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setAutos(autos);
      setLoading(false);
    }
    fetchAutos();
  }, []);
  return (
    autos && (
      <div className="mx-auto">
        <h1 className='text-center footer-banner'>Autos for sale</h1>
          <div className="bg-purple-100">
            <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 container mx-auto px-4 py-4">
                {autos.map(({ auto, id }) => (
                <div key={id}>
                  <div
                    style={{
                      background: `url(${auto.images[0]}) `,
                      backgroundSize: "cover",
                    }}
                    className="animal-image"
                  >
                </div>
                  <p className="animal-name text-center text-xl mb-2">{auto.make}</p>
                  <p className="animal-char text-center text-xl mb-2">{auto.model}</p>
                  <div className="text-center py-2">
                    <Link className="button-link cursor-pointer py-2 px-5" to={`/auto/${id}`}>See More</Link>                         
                  </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        )
      )
    }
