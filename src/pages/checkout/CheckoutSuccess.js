import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <section className="mt-10">
      <div className="mt-10">
        <h1 className="text-center text-4xl">Checkout Successful</h1>
        <p className="text-center">Thank you for your purchase!</p>
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