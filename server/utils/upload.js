const multer = require('multer');
const uuid   = require('node-uuid');

// Config upload

const storage = multer.diskStorage({
  destination : (req, file, cb) => cb(null, `${__dirname}/../../dist/uploads/`),
  filename : (req, file, cb) => cb(null, uuid.v4())
});
const upload = multer({ storage });

module.exports = upload;
