const express = require("express");
const prisma = require("../prisma");

const router = express.Router();

// Create a class
router.post("/", async (req, res) => {
  const { name, description, imageUrl } = req.body;

  try {
    const newClass = await prisma.class.create({
      data: {
        name,
        description,
        imageUrl,
      },
    });

    res.json(newClass);
  } catch (error) {
    res.status(500).json({ message: "Error creating class" });
  }
});

// Get all classes
router.get("/", async (req, res) => {
  try {
    const classes = await prisma.class.findMany();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes" });
  }
});

module.exports = router;
