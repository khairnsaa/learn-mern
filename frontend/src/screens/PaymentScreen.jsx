import { Button, Form } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../slices/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const handleSubmitPayment = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  useEffect(() => {
    if (!shippingAddress) navigate("/shipping");
  }, [shippingAddress, navigate]);
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment</h1>
      <Form onSubmit={handleSubmitPayment}>
        <Form.Group controlId="payment" className="my-2">
          <Form.Label>Select Payment Method</Form.Label>
          <Form.Check
            type="radio"
            name="payment"
            value="PayPal"
            id="Paypal"
            label="Paypal or Credit Card"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-2">
          Place An Order
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
