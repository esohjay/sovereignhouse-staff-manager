const admin = require("firebase-admin");
const getAuth = require("firebase-admin/auth");

const serviceAccount = require("../firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
