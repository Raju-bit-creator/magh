const express = require("express");
const Product = require("../model/Product");
const { validationResult, body } = require("express-validator");
const fetchUser = require("../middleware/Fetchuser");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("hello product router");
// });

router.get("/getproduct", async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });
    res.json(products);
  } catch (error) {
    res.status(500).send("internal server error", error);
  }
});

router.post(
  "/addproduct",
  fetchUser,
  [
    body("title")
      .isLength({ min: 3 })
      .withMessage("product title must be atleast 3 character"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("product description must be atleast 5 character"),
    body("price").isNumeric().withMessage("Price must be number"),
    body("instock").isNumeric().withMessage("Instock  must be number"),
  ],
  async (req, res) => {
    console.log("req body", req.body);

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const product = new Product({
        title,
        description,
        price,
        instock,
        user: req.user.id,
      });
      const saveProduct = await product.save();
      res.json(saveProduct);
    } catch (error) {
      res.status(500).send("internal server error", error);
    }
  }
);

module.exports = router;
