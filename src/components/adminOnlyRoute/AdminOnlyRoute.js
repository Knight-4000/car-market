import React from "react";
 import { useSelector } from "react-redux";
 import { selectEmail } from "../../redux/slice/authSlice";
 import { Link } from "react-router-dom";
 import './admin-route.scss';

 const AdminOnlyRoute = ({ children }) => {
   const userEmail = useSelector(selectEmail);

  if (userEmail === "roger@hotmail.com") {
    return children;
  }
  return (
    <>
      <section className="admin-only pt-40 ">
        <div className="container">
          <h2 className="text-center">Whoops! Wrong turn!</h2>
          <p className="text-center">This page can only be viewed by an Admin user.</p>    
          <div className="flex flex-col items-center">
            <Link to="/">
              <button className="mt-5 w-50 px-7 py-3 bg-blue-600 
                text-white font-medium text-sm uppercase rounded shadow-md 
                hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
                active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Return Home
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

 export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "roger@hotmail.com") {
    return children;
  }
  return null;
};

 export default AdminOnlyRoute;