
const mongoose = require("mongoose");

const CarImageSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "CarRegister", required: true },
  url: { type: String, required: true },
  metadata: {
    fileName: String,
    fileSize: Number,
    fileType: String,
    uploadedAt: { type: Date, default: Date.now },
  },
});

module.exports = mongoose.model("CarImage", CarImageSchema);
