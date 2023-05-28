import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModels.js";

// @desc fetch all products
// @route GET api/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({}); // pass an empty object so it would get all of the data
  res.json(product);
});

// @desc fetch 1 product based on id
// @route GET api/products/:id
// @access public
const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) res.json(product);
  res.status(404);
  throw new Error("Resource Not Found");
});

export { getProducts, getProductByID };
