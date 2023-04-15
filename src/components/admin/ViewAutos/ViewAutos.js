import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../firebase/config";
import { useNavigate } from "react-router-dom";
export default function ViewAutos() {
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
        <h1 className='text-center footer-banner'>Cats For Adoption</h1>
          <div className="bg-purple-100">
            <div className="grid gap-2 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 container mx-auto px-4 py-4">
                {autos.map(({ data, id }) => (
                <div key={id}>
                  <div
                    style={{
                      background: `url(${data.imgUrls[0]}) `,
                      backgroundSize: "cover",
                    }}
                    className="w-40 h-40"
                  >
                </div>
                <p className="animal-name text-center text-xl mb-2">{data.categories}</p>
                  <p className="animal-name text-center text-xl mb-2">{data.make}</p>
                  <p className="animal-char text-center text-xl mb-2">{data.model}</p>
         
                </div>
                ))}
              </div>
            </div>
          </div>
    )
  );
}