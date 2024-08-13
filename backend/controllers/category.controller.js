import Category from "../models/category.schema.js";
import path from "path";
const __dirname = path.resolve();
import fs from "fs";

export const getAllCategories = async (req, res, next) => {
  const cats = await Category.find({}).populate("products"); //.populate will bring all the products which are link with one category and products is the field name which we have given in category schema
  res.json({
    categories: cats,
    message: "get All Categories",
  });
};

export const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (category) {
      res.json(category);
    } else {
      next(new Error("Catogory not found"));
    }
  } catch (error) {
    next(error);
  }
};

export const addNewCategory = async (req, res, next) => {
  const newCategory = req.body;

  try {
    const encoded = newCategory.image;
    const base64ToArray = encoded.split(";base64,");
    const prefix = base64ToArray[0];
    const extension = prefix.replace(/^data:image\//, "");
    if (extension === "jpeg" || extension === "jpg" || extension === "png") {
      const imageData = base64ToArray[1];
      const fileName = ((new Date().getTime() / 1000) | 0) + "." + extension;

      const imagePath =
        path.join(__dirname, "./public/uploads/category/") + fileName; //---/upload/32658921_abc.jpg

      const filePath = path.resolve(imagePath);
      fs.writeFileSync(filePath, imageData, { encoding: "base64" });
      if (await Category.create(newCategory)) {
        res.json({
          success: true,
          message: "Category has been created",
        });
      } else {
        return next(new Error("Something went wrong"));
      }
    } else {
      return next(
        new Error("The image is not valid, please upload jpg, png or jpeg")
      );
    }
  } catch (e) {
    return next(new Error(e.message));
  }
};

export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const updatedCategory = req.body;

  const cat = await Category.findByIdAndUpdate(id, updatedProduct);
  res.json({
    updateCategory: cat,
    message: "Category has been Updated",
  });
};

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  const cat = await Category.findByIdAndDelete(id);
  res.json({
    deletedCategory: cat,
    message: "Category has been deleted",
  });
};
