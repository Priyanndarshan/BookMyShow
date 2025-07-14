const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const verifyToken = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/profile", verifyToken, (req, res) => {
  res.json({ 
    message: "Protected route accessed",
    user: req.user 
  });
});

module.exports = router;
