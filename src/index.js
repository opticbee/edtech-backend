require("dotenv").config();

const express = require("express");
const cors = require("cors");

const adminRoutes = require("./routes/admin");
const classRoutes = require("./routes/class");
const userRoutes = require("./routes/user");



const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("EdTech Backend Running");
});

app.use("/api/admin", adminRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/users", userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
