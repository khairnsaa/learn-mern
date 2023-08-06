import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { useRegisterMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const SignupScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [payload, setPayload] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);
  const redirect = searchParam.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (payload.confirmPassword !== payload.password) {
      toast.error("Password didn't match");
    } else {
      try {
        const res = await register({
          name: payload.name,
          email: payload.email,
          password: payload.password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>Register New Member</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={payload.name}
            onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={payload.email}
            onChange={(e) => setPayload({ ...payload, email: e.target.value })}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={payload.password}
            onChange={(e) => setPayload({ ...payload, password: e.target.value })}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={payload.confirmPassword}
            onChange={(e) => setPayload({ ...payload, confirmPassword: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
          Register
        </Button>
        {isLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Form>
      <Row className="py-3">
        <Col>
          Already Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>login now</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default SignupScreen;
