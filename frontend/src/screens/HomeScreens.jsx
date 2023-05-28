import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
// import products from '../products'
import Product from "../components/Product";
import axios from "axios";

const HomeScreens = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProduct();
    // axios.get("/api/products").then((result) => setProducts(result.data));
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreens;
