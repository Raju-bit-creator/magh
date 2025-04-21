const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json());
const port = process.env.PORT;
console.log("port number is", port);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/blogs", (req, res) => {
  res.send("welcome to my new blogs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
