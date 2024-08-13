import express from "express";
import {
  isAuthenticateUser,
  authrizedUser,
} from "../middlewares/authMiddleware.js";
const router = express.Router();
import {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductById);
router
  .route("/new/product")
  .post(isAuthenticateUser, authrizedUser("admin"), addNewProduct);
router.route("/product/update/:id").put(updateProduct);
router.route("/product/delete/:id").delete(deleteProduct);

export default router;
