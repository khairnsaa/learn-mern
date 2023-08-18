import express from "express";
import { protectedRoute, admin } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getMyOrder,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protectedRoute, createOrder).get(protectedRoute, admin, getOrders);
router.route("/myorder").get(protectedRoute, getMyOrder);
router.route("/:id").get(protectedRoute, admin, getOrderById);
router.route("/:id/pay").put(protectedRoute, updateOrderToPaid);
router.route("/:id/deliver").put(protectedRoute, admin, updateOrderToDelivered);

export default router;
