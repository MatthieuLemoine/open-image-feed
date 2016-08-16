const multer = require('multer');
const uuid   = require('node-uuid');

// Config upload

const storage = multer.diskStorage({
  destination : (req, file, cb) => cb(null, `${__dirname}/../../dist/uploads/`),
  filename : (req, file, cb) => {
    let name = uuid.v4();
    if (file.mimetype && file.mimetype.split('/').length > 1) {
      const type = file.mimetype.split('/')[1];
      name += `.${type}`;
    }
    cb(null, name);
  }
});
const upload = multer({ storage });

module.exports = upload;
