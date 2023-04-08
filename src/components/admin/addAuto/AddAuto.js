 import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import { toast } from "react-toastify";
 import { db, storage } from "../../../firebase/config";
 import { addDoc, collection, Timestamp } from "firebase/firestore";
 import Loader from "../../loader/Loader";
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
    model: "",
    mileage: 0,
    desc: "",
  };

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
   
        const storageRef = ref(storage, "auto");
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
            mileage: auto.mileage,
            make: auto.make,
            model: auto.model,
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
       <div className="">
         <h1>Add New Auto</h1>
         <div className="card">
           <form onSubmit={addAuto}>
             <label>Auto Make:</label>
             <input
               type="text"
               placeholder="Make"
               required
               name="make"
               value={auto.make}
               onChange={(e) => handleInputChange(e)}
             />

            <label>Auto Model:</label>
            <input
                type="text"
                placeholder="Model"
                required
                name="model"
                value={auto.model}
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
