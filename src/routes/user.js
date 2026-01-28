const express = require("express");
const prisma = require("../prisma");

const router = express.Router();

/**
 * Create user and assign to a class
 */
router.post("/", async (req, res) => {
  const { email, password, classId } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        classId,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

/**
 * Mobile login API
 * Returns class info for logged-in user
 */
router.post("/mobile/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { class: true },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      email: user.email,
      class: user.class,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
