import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "../../redux/slice/checkoutSlice";
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary.js";
import './checkout.scss';

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    navigate("/checkout");
  };

  return (
    <section className="mt-10">
      <div className="container checkout mt-10">
        <h1 className="checkout-banner text-center pb-5">Checkout Details</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass="card">
              <p>Shipping Address</p>
              <label>Recipient Name</label>
              <input
                type="text"
                placeholder="Recipient Name"
                required
                name="name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />
              <label>Address line 1</label>
              <input
                type="text"
                placeholder="Address line 1"
                required
                name="line1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
              <label>Address line 2</label>
              <input
                type="text"
                placeholder="Address line 2"
                name="line2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                required
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />
              <label>State</label>
              <input
                type="text"
                placeholder="State"
                required
                name="state"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
              />
              <label>Postal code</label>
              <input
                type="text"
                placeholder="Postal code"
                required
                name="postal_code"
                value={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
              />
  
              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone"
                required
                name="phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
            </Card>
            {/* BILLING ADDRESS */}
            <Card cardClass="card mt-5">
              <p>Billing Address</p>
              <label>Recipient Name</label>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={billingAddress.name}
                onChange={(e) => handleBilling(e)}
              />
              <label>Address line 1</label>
              <input
                type="text"
                placeholder="Address line 1"
                required
                name="line1"
                value={billingAddress.line1}
                onChange={(e) => handleBilling(e)}
              />
              <label>Address line 2</label>
              <input
                type="text"
                placeholder="Address line 2"
                name="line2"
                value={billingAddress.line2}
                onChange={(e) => handleBilling(e)}
              />
              <label>City</label>
              <input
                type="text"
                placeholder="City"
                required
                name="city"
                value={billingAddress.city}
                onChange={(e) => handleBilling(e)}
              />
              <label>State</label>
              <input
                type="text"
                placeholder="State"
                required
                name="state"
                value={billingAddress.state}
                onChange={(e) => handleBilling(e)}
              />
              <label>Postal code</label>
              <input
                type="text"
                placeholder="Postal code"
                required
                name="postal_code"
                value={billingAddress.postal_code}
                onChange={(e) => handleBilling(e)}
              />

              <label>Phone</label>
              <input
                type="text"
                placeholder="Phone"
                required
                name="phone"
                value={billingAddress.phone}
                onChange={(e) => handleBilling(e)}
              />
              <button type="submit" className="bg-blue-600 inline-flex items-center px-3 py-3 
                  font-medium rounded mb-6 mt-2 w-50 px-7 py-3 text-white font-medium text-sm 
                  uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 
                  focus:shadow-lg active:bg-blue-800 active:shadow-lg 
                  transition duration-150 ease-in-out">
                    Proceed To Checkout
              </button>
            </Card>
          </div>
          <div>
          <Card cardClass="card">
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;