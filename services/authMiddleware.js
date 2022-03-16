import jwt from "jsonwebtoken";
import "dotenv/config";

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.sendStatus(401).send("No token, authorization denied");
  }

  try {
    const { user } = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401).send("Token is not valid");
  }
};

export default authMiddleware;
