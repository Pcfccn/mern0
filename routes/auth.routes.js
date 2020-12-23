const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jsonwebtoken = require("jsonwebtoken");
const config = require("config");

router.get("/test", (req, res) => {
  console.log("test get work!");
  res.send("sag");
});

router.post("/testPost", (req, res) => {
  try {
    console.log("testPost work!");
    res.send("Hi, I have been worked");
  } catch (error) {
    console.log(error);
  }
});

router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Min length is 6 simbols").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
console.log(errors);
      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
          message: "Invalid registration data",
        });
      }
      console.log("req.body tut!", req.body);
      const { email, password } = req.body;
      const condidate = await User.findOne({ email });

      if (condidate) {
        return res
          .status(400)
          .json({ message: "Sorry. user with this email already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json("User has been created");
    } catch (error) {
      res.status(500).json({message: error.message || "ошибочка нахуй"});
    }
  }
);
router.post(
  "/login",
  [
    check("email", "Incorrect email").normalizeEmail().isEmail(),
    check("password", "Enter password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        res.status(400).json({
          errors: errors.array(),
          message: "Invalid login data",
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ message: "Sorry. user with this email  doesnt exist" });
      }

      const isMatch = await bcrypt.compare(password.user.password);

      if (!isMach) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jsonwebtoken.sign(
        { userId: user.id },
        config.get("jwtSecret"),
        { expiresIn: "1h" }
      );

      res.json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ message: "Opps, error, just try again" });
    }
  }
);

module.exports = router;
