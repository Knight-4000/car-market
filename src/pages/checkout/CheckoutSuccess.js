import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2 className="text-center">Checkout Successful</h2>
        <p className="text-center">Thank you for your purchase</p>
          <div className="outer">
            <div className="inner py-4">
              <button className="mb-6 mt-2 w-full px-7 py-3 bg-blue-600 
                  text-white font-medium text-sm uppercase rounded shadow-md 
                  hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg 
                  active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                  <Link to="/order-history">View Order Status</Link>
              </button>
            </div>
          </div>
      </div>
    </section>
  );
};

export default CheckoutSuccess;