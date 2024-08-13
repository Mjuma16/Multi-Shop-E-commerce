import express from "express";
import {
  isAuthenticateUser,
  authrizedUser,
} from "../middlewares/authMiddleware.js";
const router = express.Router();
import {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

router.route("/categories").get(getAllCategories);
router.route("/category/:id").get(getCategoryById);
router
  .route("/new/category")
  .post(isAuthenticateUser, authrizedUser("admin"), addNewCategory);
router.route("/category/update/:id").put(updateCategory);
router.route("/category/delete/:id").delete(deleteCategory);

export default router;
