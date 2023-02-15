const admin = require("../config/firebase");
class AuthMiddleware {
  async verifyUser(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("Token error, please check token.");
    }
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      console.log("Decode token ############", decodedToken);
      return next();
    } catch (err) {
      console.log(err);
      return res.status(401).send("Unauthorized Request");
    }
  }
  async verifyAdmin(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("Token error, please check token.");
    }
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      if (decodedToken.admin === true) {
        req.user = decodedToken;
        return next();
      } else {
        return res.status(401).send("Admin access only.");
      }
    } catch (err) {
      return res.status(401).send("Unauthorized request.");
    }
  }
}

module.exports = new AuthMiddleware();
