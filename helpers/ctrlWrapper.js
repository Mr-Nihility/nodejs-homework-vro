const RequestError = require("./RequestError");
const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      console.error(error);
      next(RequestError(404, `Not found contact with id:${error.stringValue}`));
    }
  };

  return func;
};

module.exports = ctrlWrapper;
