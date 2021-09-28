const express = require("express");
const cors = require("cors");

const app = express();

// Config JSON response
app.use(express.json());

// Solve CORS
app.use(cors());

// Routes
const PetRoutes = require("./routes/PetRoutes");
const UserRoutes = require("./routes/UserRoutes");

app.use("/pets", PetRoutes);
app.use("/users", UserRoutes);

app.listen(5000);
