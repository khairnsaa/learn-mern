import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [shippingState, setShippingState] = useState({
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    postalCode: shippingAddress?.postalCode || "",
    country: shippingAddress?.country || "",
  });

  const handleChangeTextField = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setShippingState({ ...shippingState, [name]: value });
  };

  const handleSubmitShipping = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(shippingState));
    navigate("/payment");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmitShipping}>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Enter Address"
            value={shippingState.address}
            onChange={handleChangeTextField}
          />
        </Form.Group>
        <Form.Group controlId="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            placeholder="Enter city"
            value={shippingState.city}
            onChange={handleChangeTextField}
          />
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="postalCode"
            placeholder="Enter Postal Code"
            value={shippingState.postalCode}
            onChange={handleChangeTextField}
          />
        </Form.Group>
        <Form.Group controlId="country" className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            placeholder="Enter Country"
            value={shippingState.country}
            onChange={handleChangeTextField}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-2">
          Continue To Payment
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
