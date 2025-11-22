const multer = require('multer');

// Memory storage; adjust if you need disk or cloud storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;