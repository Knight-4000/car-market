import { SpinnerInfinity } from "spinners-react";
import "./loader.scss";
import ReactDOM from "react-dom";

 const Loader = () => {
   return ReactDOM.createPortal(
     <div className="wrapper">
       <div className="loader">
        <SpinnerInfinity size={69} thickness={100} speed={100} color="rgba(57, 96, 172, 1)" secondaryColor="rgba(57, 89, 172, 0.44)" />
       </div>
     </div>,
     document.getElementById("loader")
   );
 };

 export default Loader;