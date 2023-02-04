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
      return next();
    } catch (err) {
      return res.status(401).send("Unauthorized Request");
    }
  }
}

module.exports = new AuthMiddleware();
