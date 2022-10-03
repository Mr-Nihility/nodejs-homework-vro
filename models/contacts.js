const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");
const handleDBError = require("../helpers/middlewares/handleDBErrors");

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
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
  },

  { versionKey: false }
);

contactSchema.post("save", handleDBError);

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
