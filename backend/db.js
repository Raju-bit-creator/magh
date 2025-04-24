const mongoose = require("mongoose");
const dbConnect = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("mongodb connected successfully");
  });
};
module.exports = dbConnect;
