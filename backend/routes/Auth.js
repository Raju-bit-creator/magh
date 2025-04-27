const express = require("express");
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const secret = process.env.JWT_SECRET;

router.post(
  "/createuser",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("name must be atleast 3 character"),
    body("email").isEmail().withMessage("enter valid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("password must be atleast 5 character"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).send("user already exist use new email");
      }
      const salt = bcrypt.genSaltSync(10);
      const secPass = bcrypt.hashSync(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      var authToken = jwt.sign(data, secret);
      res.json({ user, authToken });
      console.log("auth", authToken);
    } catch (error) {
      res.status(500).send("internal server error");
    }
  }
);

//login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("enter valid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("password must be atleast 5 character"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body; //destructuring

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send({ message: "you are not register user " });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).send({ message: "invalid credential " });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, secret);
      res.json({ user, authToken });
    } catch (error) {
      res.status(500).send("internal server error111");
    }
  }
);

module.exports = router;
