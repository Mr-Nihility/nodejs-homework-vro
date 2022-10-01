const isConflict = ({ name, code }) => {
  console.log("name", name, "code", code);
  return name === "MongoServerError" && code === 11000;
};

function handleDBError(error, _, next) {
  error.status = isConflict(error) ? 409 : 400;
  next();
}

module.exports = handleDBError;
