const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jsonwebtoken = require("jsonwebtoken");
const config = require("config");

router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Min length is 6 simbols").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
          message: "Invalid registration data",
        });
      }
      const { email, password } = req.body;
      const condidate = await User.findOne({ email });

      if (condidate) {
        return res
          .status(400)
          .json({ message: "Sorry, user with this email already exist" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json("User has been created");
    } catch (error) {
      res.status(500).json({message: error.message || "Some error of server"});
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

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jsonwebtoken.sign(
        { userId: user.id },
        config.get("jwtSecret"),
        { expiresIn: "1h" }
      );

      res.json({ message: 'logged in!', token, userId: user.id });
    } catch (error) {
      res.status(500).json({ error: error.message, message: "Opps, error, just try again" });
    }
  }
);

module.exports = router;
