const customError = require("../errors");
const { verifyJWT } = require("../utils/jwt");

const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new customError.UnauthenticatedError("Authentication failed");
  }

  try {
    const { userId, name, role } = verifyJWT(token);
    req.user = { userId, name, role };
    next();
  } catch (error) {
    throw new customError.UnauthenticatedError("Authentication failed");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new customError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};
module.exports = { authenticateUser, authorizePermissions };
