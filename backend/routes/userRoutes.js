import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protectedRoute, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protectedRoute, admin, getUsers);
router.post("/logout", logoutUser);
router.post("/login", authUser);
router.route("/profile").get(protectedRoute, getUserProfile).put(protectedRoute, updateUserProfile);
router
  .route("/:id")
  .get(protectedRoute, admin, getUserByID)
  .put(protectedRoute, admin, updateUser)
  .delete(protectedRoute, admin, deleteUser);

export default router;
