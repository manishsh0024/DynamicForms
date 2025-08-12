// backend/createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);
  await Admin.create({
    name: "Manish Sharma",
    email: "admin@form.com",
    password: hashedPassword,
  });
  console.log("Admin created Successfully");
  process.exit();
});