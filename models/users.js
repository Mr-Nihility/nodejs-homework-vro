const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");
const handleDBError = require("../helpers/middlewares/handleDBErrors");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
    minlength: 6,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: "",
  },
});

userSchema.post("save", handleDBError);

const UserModel = mongoose.model("user", userSchema);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  token: Joi.string(),
});
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  UserModel,
  registerSchema,
  loginSchema,
};
