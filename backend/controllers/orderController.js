import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderSchema.js";

// @desc create new order
// @route POST api/orders
// @access private
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length !== 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItem: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

// @desc get logged in user order(s)
// @route GET api/orders/myorder
// @access private
const getMyOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc get order by id
// @route GET api/orders/:id
// @access private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  console.log(order);
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

// @desc update order to paid
// @route PUT api/orders/:id/pay
// @access private / admin
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("paying the order");
});

// @desc update order to delivered
// @route PUT api/orders/:id/deliver
// @access private / admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("delivering the order");
});

// @desc get all orders
// @route GET api/orders
// @access private / admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("orders data");
});

export {
  createOrder,
  getMyOrder,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders,
};
