const admin = require("../config/firebase");
class AuthMiddleware {
  async verifyUser(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ message: "Token error, please check token." });
    }
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;

      // console.log("Decode token ############", decodedToken);
      // console.log("req ############", req.user);
      return next();
    } catch (err) {
      console.log(err);
      return res.status(401).send(err);
    }
  }
  async verifyAdmin(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ message: "Token error, please check token." });
    }
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      if (decodedToken.admin === true) {
        req.user = decodedToken;
        return next();
      } else {
        return res.status(401).send({ message: "Admin access only." });
      }
    } catch (err) {
      return res.status(401).send(err);
    }
  }
}

module.exports = new AuthMiddleware();
