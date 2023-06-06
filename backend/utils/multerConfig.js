const multer = require("multer");
const cvStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/uploads/resumes");
  },
  filename: (req, file, callBack) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callBack(
      null,
      new Date().getTime() + "-" + uniqueSuffix + "-" + file.originalname
    );
  },
});
const receiptStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/uploads/receipts");
  },
  filename: (req, file, callBack) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callBack(
      null,
      new Date().getTime() + "-" + uniqueSuffix + "-" + file.originalname
    );
  },
});

const cvFileFilter = (req, file, cb) => {
  // reject all files except jpeg
  if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const receiptFileFilter = (req, file, cb) => {
  // reject all files except jpeg
  if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" ||
    "image/jpeg" ||
    "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports.uploadCv = multer({
  storage: cvStorage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5mb max size,
  },
  fileFilter: cvFileFilter,
});
module.exports.uploadReceipt = multer({
  storage: receiptStorage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5mb max size,
  },
  fileFilter: receiptFileFilter,
});
