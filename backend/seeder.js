import connectDB from "./config/db.js";
import dotenv from "dotenv";
import User from "./models/userModels.js";
import Product from "./models/productModels.js";
import Order from "./models/orderSchema.js";
import users from "./data/user.js";
import products from "./data/products.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const productsSample = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(productsSample);

    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") destroyData();
else importData();
