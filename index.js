const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();

// route

const userRoute = require("./routs/userRoute");
const categoryRoute = require("./routs/categoryRoute");
const productRoute = require("./routs/productRoute");
const bannerRoute = require("./routs/bannerRoute");
// app

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middlewar

app.use(morgan("dev"));
app.use(cors());

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected!"))
  .catch((error) => console.log("db connection error", error));

//   user route
app.use("/api", userRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", bannerRoute);
app.use("/uploads/", express.static("uploads"));
// port

const port = process.env.PORT;

app.listen(port, () => console.log(`server is running on port ${port}`));
