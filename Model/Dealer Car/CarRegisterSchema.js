
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
    status: {
      type: String,
      enum: ["Available", "Sold", "Pending"],
      default: "Available",
    },
     // References
  carImages: [{ type: Schema.Types.ObjectId, ref: "CarImage" }],
  documents: [{ type: Schema.Types.ObjectId, ref: "CarDocument" }]
  },
  { timestamps: true }
);

const CarRegister = model('RegistorCar', RegisterCar)

module.exports = CarRegister