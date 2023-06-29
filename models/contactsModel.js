const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please insert the name"],
      maxlength: [60, "Name to large, please use less than 60 characters"],
    },
    email: {
      type: String,
      required: [true, "Please insert the email"],
      unique: true,
      maxlength: [100, "Email to large, please use less than 100 characters"],
    },
    phone: {
      type: String,
      required: [true, "Please insert the phone number"],
      unique: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },
    favorite: {
      type: Boolean,
      default: false,
      required: [true, "Please set favorite status"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { collection: "contacts", versionKey: false }
);

module.exports = mongoose.model("Contact", contactSchema);
