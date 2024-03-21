const jwt = require("jsonwebtoken");

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const attachCookiesToResponse = (res, payload) => {
  const token = createJWT(payload);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });
};

module.exports = { createJWT, verifyJWT, attachCookiesToResponse };
