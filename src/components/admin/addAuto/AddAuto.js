import { useState } from "react"
import { toast } from "react-toastify";
import {
    getStorage,
    ref,
    docRef,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useNavigate } from "react-router";

export default function CreateAuto() {
    const navigate = useNavigate();
    const auth = getAuth();
    const categories = [
      { id: 1, name: "Sedan" },
      { id: 2, name: "Suv" },
      { id: 3, name: "Sports" }
    ];
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        make: "",
        model: "",
        description: "",
        price: 0,
        categories: "",
        mileage: 0,
        images: {}
    });

    const {
        make,
        model,
        description,
        price,
        category,
        mileage,
        images
    } = formData;

    function onChange(e) {
        let boolean = null;
        if (e.target.value === "true") {
          boolean = true;
        }
        if (e.target.value === "false") {
          boolean = false;
        }
        // Files
        if (e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            images: e.target.files,
          }));
        }
        // Text/Boolean/Number
        if (!e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: boolean ?? e.target.value,
          }));
        }
      }
      async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (images.length > 1) {
          setLoading(false);
          toast.error("Only one image per auto");
          return;
        }

        async function storeImage(image) {
          return new Promise((resolve, reject) => {
            const storage = getStorage();
            const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

               switch (snapshot.state) {
           
               }
             },
                (error) => {
                  // Handle unsuccessful uploads
                  reject(error);
                },
                () => {
                  // Handle successful uploads on complete
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                  });
                }
              );
            });
          }

        const imgUrls = await Promise.all(
          [...images].map((image) => storeImage(image))
        ).catch((error) => {
          setLoading(false);
          toast.error("Image not uploaded");
          return;
        });

        const formDataCopy = {
          ...formData,
          imgUrls,
          timestamp: serverTimestamp(),
        };
        delete formDataCopy.images;
        const docRef = await addDoc(collection(db, "autos"), formDataCopy);
        setLoading(false);
        toast.success("Auto added");
        navigate('/admin/all-autos');
      }
      if (loading) {
        return <h3>Loading</h3>
    }
    return (
      <main className="max-w-md px-2 mx-auto">
        <h1 className="text-2xl text-center mt-8 font-bold">Add your cat</h1>
          <form onSubmit={onSubmit}>
          <p className="text-lg mt-6 font-semibold">Make</p>
            <input
              type="text"
              id="make"
              value={make}
              onChange={onChange}
              placeholder="Make"
              maxLength="30"
              minLength="3"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />

          <p className="text-lg font-semibold">Model</p>
            <textarea
              type="text"
              id="model"
              value={model}
              onChange={onChange}
              placeholder="model"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />

          <p className="text-lg font-semibold">Description</p>
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={onChange}
              placeholder="Description"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />

          <p className="text-lg font-semibold">Price</p>
            <textarea
              type="number"
              id="price"
              value={price}
              onChange={onChange}
              placeholder="Price"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />

          <p className="text-lg font-semibold">Mileage</p>
            <textarea
              type="number"
              id="mileage"
              value={mileage}
              onChange={onChange}
              placeholder="Mileage"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
            />
          <div className="mb-6">
            <p className="text-lg font-semibold">Image</p>
            <input
              type="file"
              id="images"
              onChange={onChange}
              accept=".jpg,.png,.jpeg"
              multiple
              required
              className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
            />
          </div>
          <button type="submit" className="button-link py-3 px-5">Add Cat</button>
        </form>
      </main>
    );
  }
