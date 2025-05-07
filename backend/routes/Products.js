const express = require("express");
const Product = require("../model/Product");
const { validationResult, body } = require("express-validator");
const fetchUser = require("../middleware/Fetchuser");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("hello product router");
// });
router.get("/getallproduct", fetchUser, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).send("internal server error", error);
  }
});
router.get("/getproduct", fetchUser, async (req, res) => {
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
    try {
      const { title, description, price, instock } = req.body;
      console.log("this is req boyd", req.body);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let image = req.files.map((el) => {
        return el.filename;
      });
      console.log(image);

      const product = new Product({
        title,
        description,
        price,
        instock,
        image,
        user: req.user.id,
      });
      const saveProduct = await product.save();
      res.json(saveProduct);
    } catch (error) {
      res.status(500).send("internal server error", error);
    }
  }
);

//update product

router.put("/updateproduct/:id", fetchUser, async (req, res) => {
  const { title, description, price, instock } = req.body; //destructuring

  try {
    const newProduct = {};
    if (title) newProduct.title = title;
    if (description) newProduct.description = description;
    if (price) newProduct.price = price;
    if (instock) newProduct.instock = instock;
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("product not found");
    }
    if (!product.user || product.user.toString() !== req.user.id) {
      return res.status(401).send("not authorized");
    }
    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: newProduct },
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).send("internal server error", error);
  }
});

//delete product
router.delete("/deleteproduct/:id", fetchUser, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("product not found");
    }
    if (!product.user || product.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    product = await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "product deleted successfully" });
  } catch (error) {
    res.status(500).send("internal server error", error);
  }
});

module.exports = router;
