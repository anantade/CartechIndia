
const { Schema, model } = require('mongoose');

const SignUpSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      street1: {
        type: String,
        required: true,
      },
      street2: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
    },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "USER", "DEALER","SELLS"]
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SignUp = model('SignIn', SignUpSchema);

module.exports = SignUp;
