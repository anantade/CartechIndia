
const mongoose = require("mongoose");

const connectToDataBase = () => {
  return mongoose
    .connect("mongodb://127.0.0.1:27017/CarTechIndia")
    .then(() => console.log("DataBase connected"))
    .catch((err) => console.log(err));
};

module.exports = {connectToDataBase}