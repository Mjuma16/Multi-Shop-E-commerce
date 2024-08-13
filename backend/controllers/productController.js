import Product from "../models/productSchema.js";
import { imageUploading } from "../utils/utils.js";

import path from "path";
import Category from "../models/category.schema.js";

export const getAllProducts = async (req, res, next) => {
  const r = await Product.find({});
  res.json({
    products: r,
    message: "get All Proucts",
  });
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      next(new Error("Product not found"));
    }
  } catch (error) {
    next(error);
  }
};

export const addNewProduct = async (req, res, next) => {
  const newProduct = req.body;

  const imageUrl = await imageUploading({
    folder: "products",
    image: newProduct.image,
  });

  newProduct.image = imageUrl;

  const product = await Product.create(newProduct);
  //when we add product. so that product should be added to the category which user has selected.
  const categoryId = product.category.toString();
  const productId = product._id.toString();

  const category = await Category.findById(categoryId);
  const newProducts = [...category.products, productId.toString()];
  category.products = newProducts;
  const updatedCat = await Category.findByIdAndUpdate(categoryId, category);

  if (product) {
    res.json({
      message: "Product has been created",
      success: true,
    });
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const updatedProduct = req.body;

  const r = await Product.findByIdAndUpdate(id, updatedProduct);
  res.json({
    product: r,
    message: "Product has been Updated",
  });
};

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const r = await Product.findByIdAndDelete(id);
  res.json({
    product: r,
    message: "Product has been deleted",
  });
};
