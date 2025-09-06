
const express = require("express");
const path = require("path");
const app = express();
const { connectToDataBase } = require("./Connection");
const SingUprouter = require("./Routes/SIgnUpRoutes");
const { addCarRoute } = require("./Routes/DealerCarRoute");

// Middleware
app.use(express.json());

// 🔹 Serve uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connection To DataBase
connectToDataBase();

// Routers
app.use(SingUprouter);
app.use(addCarRoute);

app.listen(3000, () => console.log(`Server running at 3000`));
