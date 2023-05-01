import { getDownloadURL, ref, uploadBytesResumable, getStorage } from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../loader/Loader";
import { db } from "../../../firebase/config";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import './addauto.scss';

const categories = [
   { id: 1, name: "Sedan" },
   { id: 2, name: "Suv" },
   { id: 3, name: "Sports" }
 ];

const initialState = {
   imageURL: "",
   price: 0,
   category: "",
   make: "",
   trim: "",
   title: "",
   mpg: "",
   fuel: "",
   exterior: "",
   interior: "",
   engine:"",
   transmission: "",
   name: "",
   mileage: 0,
   desc: "",
 };

 const auth = getAuth();
 const AddAuto = () => {
   const [auto, setAuto] = useState({
       ...initialState,
     });
  
     const [uploadProgress, setUploadProgress] = useState(0);
     const [isLoading, setIsLoading] = useState(false);
  
     const navigate = useNavigate();
  
     const handleInputChange = (e) => {
       const { name, value } = e.target;
       setAuto({ ...auto, [name]: value });
     };
  
     const handleImageChange = (e) => {
       const file = e.target.files[0];
        console.log(file);
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${uuidv4()}`;
       const storageRef = ref(storage, filename);
       const uploadTask = uploadBytesResumable(storageRef, file);
  
       uploadTask.on(
         "state_changed",
         (snapshot) => {
           const progress =
             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           setUploadProgress(progress);
         },
         (error) => {
           toast.error(error.message);
         },
         () => {
           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
             setAuto({ ...auto, imageURL: downloadURL });
             toast.success("Image uploaded successfully.");
           });
         }
       );
     };
  
     const addAuto = (e) => {
       e.preventDefault();
       setIsLoading(true);

        try {
          const docRef = addDoc(collection(db, "autos"), {
            imageURL: auto.imageURL,
            price: Number(auto.price),
            category: auto.category,
            desc: auto.desc,
            mileage: Number(auto.mileage),
            year: auto.year,
            make: auto.make,
            model: auto.name,
            exterior: auto.exterior,
            interior: auto.interior,
            trim: auto.trim,
            title: auto.title,
            mpg: auto.mpg,
            fuel: auto.fuel,
            engine: auto.engine,
            transmission: auto.transmission,
            createdAt: Timestamp.now().toDate(),
          });
          setIsLoading(false);
          setUploadProgress(0);
          setAuto({ ...initialState });
   
          toast.success("Auto uploaded successfully.");
          navigate("/admin/all-autos");
        } catch (error) {
          setIsLoading(false);
          toast.error(error.message);
       }
     };
  
 return (
   <>
        {isLoading && <Loader />}
      <div className="mt-10">
        <h1 className="text-center">Add New Auto</h1>
        <div className="card">
          <form onSubmit={addAuto}>
            <label>Make:</label>
            <input
              type="text"
              placeholder="Make"
              required
              name="make"
              value={auto.make}
              onChange={(e) => handleInputChange(e)}
            />

           <label>Model:</label>
           <input
               type="text"
               placeholder="Model"
               required
               name="name"
               value={auto.name}
               onChange={(e) => handleInputChange(e)}
           />

        <label>Year:</label>
           <input
               type="number"
               placeholder="Year"
               required
               name="year"
               value={auto.year}
               onChange={(e) => handleInputChange(e)}
           />
          <label>Trim:</label>
           <input
               type="text"
               placeholder="Trim"
               required
               name="trim"
               value={auto.trim}
               onChange={(e) => handleInputChange(e)}
           />

          <label>Exterior:</label>
           <input
               type="text"
               placeholder="Exterior"
               required
               name="exterior"
               value={auto.exterior}
               onChange={(e) => handleInputChange(e)}
           />

          <label>Interior:</label>
            <input
               type="text"
               placeholder="Interior"
               required
               name="interior"
               value={auto.interior}
               onChange={(e) => handleInputChange(e)}
           />

          <label>Title:</label>
            <input
               type="text"
               placeholder="Title"
               required
               name="title"
               value={auto.title}
               onChange={(e) => handleInputChange(e)}
           /> 

          <label>MPG:</label>
            <input
               type="text"
               placeholder="MPG"
               required
               name="mpg"
               value={auto.mpg}
               onChange={(e) => handleInputChange(e)}
           />

          <label>Fuel:</label>
            <input
               type="text"
               placeholder="Fuel"
               required
               name="fuel"
               value={auto.fuel}
               onChange={(e) => handleInputChange(e)}
           />

        <label>Engine:</label>
            <input
               type="text"
               placeholder="Engine"
               required
               name="engine"
               value={auto.engine}
               onChange={(e) => handleInputChange(e)}
           />

          <label>Transmission:</label>
            <input
               type="text"
               placeholder="Transmission"
               required
               name="transmission"
               value={auto.transmission}
               onChange={(e) => handleInputChange(e)}
           />
            <label>Auto image:</label>
            <div className="group">
              {uploadProgress === 0 ? null : (
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="Auto Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              {auto.imageURL === "" ? null : (
                <input
                  type="text"
                  placeholder="Image URL"
                  name="imageURL"
                  value={auto.imageURL}
                  disabled
                />
              )}
            </div>

            <label>Auto price:</label>
            <input
              type="number"
              placeholder="Auto price"
              required
              name="price"
              value={auto.price}
              onChange={(e) => handleInputChange(e)}
            />

           <label>Auto mileage:</label>
            <input
              type="number"
              placeholder="Auto mileage"
              required
              name="mileage"
              value={auto.mileage}
              onChange={(e) => handleInputChange(e)}
            />


            <label>Auto Category:</label>
            <select
              required
              name="category"
              value={auto.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose auto category --
              </option>
              {categories.map((auto) => {
                return (
                  <option key={auto.id} value={auto.name}>
                    {auto.name}
                  </option>
                );
              })}
            </select>

            <label>Auto Description</label>
            <textarea
              name="desc"
              required
              value={auto.desc}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            ></textarea>

            <button className="primary">Save Auto</button>
          </form>
        </div>
      </div>
     
   </>
 )
}

export default AddAuto