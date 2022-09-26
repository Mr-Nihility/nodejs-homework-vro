const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);
const isConflict = ({ name, code }) => {
  console.log("name", name, "code", code);
  return name === "MongoServerError" && code === 11000;
};

contactSchema.post("save", (error, _, next) => {
  error.status = isConflict(error) ? 409 : 400;
  next();
});

contactSchema.post("find", (error, _, next) => {
  error.status = error.code === 11002 ? 404 : 400;
  console.log("find");
  next();
});

const ContactModel = mongoose.model("contact", contactSchema);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updfavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addSchema,
  ContactModel,
  updfavoriteSchema,
};
