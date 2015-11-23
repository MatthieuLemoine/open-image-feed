var multer  = require('multer');

// Config upload

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'-'+file.originalname);
  }
});
var upload = multer({ storage : storage });

module.exports = {
  upload : upload
};
