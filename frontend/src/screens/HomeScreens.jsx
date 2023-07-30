import { Col, Row, Spinner } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomeScreens = () => {
  const { data: products, isFetching } = useGetProductsQuery();
  return (
    <>
      {isFetching ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products?.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreens;
