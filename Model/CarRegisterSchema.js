const { Schema, model } = require("mongoose");

const RegisterCar = new Schema(
  {
    dealerId: {
      type: Schema.Types.ObjectId,
      ref: "SignUp", // 🔹 Refers to SignUp model
      required: true,
    },
    carBrand: {
      type: String,
      required: true,
    },
    carName: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "CNG", "Hybrid", "Electric"],
      required: true,
    },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
      required: true,
    },
    mileage: {
      type: Number, // kmpl
      required: true,
    },
    engineCapacity: {
      type: String, // e.g., "1197 cc"
    },
    registrationNumber: {
      type: String,
      unique: true,
      required: true,
    },
    chassisNumber: {
      type: String,
      unique: true,
      required: true,
    },
    insuranceValidTill: {
      type: Date,
    },
    price: {
      type: Number,
      required: true,
    },
    kmsDriven: {
      type: Number,
      required: true,
    },
    ownership: {
      type: Number, // 1 for first owner, 2 for second, etc.
      required: true,
    },
    carImages: [
      {
        type: String, // store image URLs
      },
    ],
    documents: {
      rcBook: { type: String }, // file URL/path
      insurancePaper: { type: String },
      pollutionCertificate: { type: String },
    },
    status: {
      type: String,
      enum: ["Available", "Sold", "Pending"],
      default: "Available",
    },
  },
  { timestamps: true }
);

const CarRegister = model('RegistorCar', RegisterCar)

module.exports = CarRegister