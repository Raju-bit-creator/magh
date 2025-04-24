const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./db");
const { chats } = require("./data/data");
dotenv.config();
const app = express();
dbConnect();

app.use(express.json());
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/blog", (req, res) => {
  res.send("welcome to my new blogs");
});
app.get("/chats", (req, res) => {
  res.send(chats);
});
app.get("/chats/:id", (req, res) => {
  let singleChat = chats.find((c) => c._id === req.params.id);
  console.log(singleChat);
  res.send(singleChat);
});

app.use("/api/auth", require("./routes/Auth"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
