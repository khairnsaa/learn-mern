import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItem } = useSelector((state) => state.cart);

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <>
      <Row>
        <Col>
          <h1>Your Cart</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {cartItem.length > 0 ? (
            <ListGroup variant="flush">
              {cartItem.map((item) => (
                <ListGroup.Item>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <h2>
              You don't have item on your cart <Link to={"/"}>Go back</Link>
            </h2>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Subtotal ({cartItem.reduce((acc, item) => acc + item.qty, 0)}) items</h2>$
                {cartItem.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItem.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
