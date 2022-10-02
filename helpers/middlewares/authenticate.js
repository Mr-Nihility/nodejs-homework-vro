const jwt = require("jsonwebtoken");
const { UserModel } = require("../../models/users");

const RequestError = require("../RequestError");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      next(RequestError(401, "Not authorized"));
    }

    try {
      jwt.verify(token, SECRET_KEY);
      const { id } = jwt.decode(token);
      const user = await UserModel.findById(id);

      if (!user) {
        next(RequestError(401, "Not authorized"));
      }
      req.user = user;

      next();
    } catch (error) {
      next(RequestError(401, "Not authorized"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
