const jwt = require("jsonwebtoken");
const { userService } = require("../modules/user");
const db = require("../database/db");

exports.tokenAuthentication = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({
      errorMessage: "You should get access token!",
    });
  }

  const token = authorization.includes("Bearer")
    ? authorization.split(" ")[1]
    : authorization;

  try {
    const { phone } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userService.getUserByPhoneNumber(phone);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      errorMessage: "Invalid Token!",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  if (!req.user) {
    throw new Error(
      "You're not authorized as Admin!"
    );
  }
};
