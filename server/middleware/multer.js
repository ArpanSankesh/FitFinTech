const multer = require('multer');

// Configure storage
const storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ 
    storage,
    limits: {
        fileSize: 50 * 1024 * 1024, 
        fieldSize: 25 * 1024 * 1024 
    }
});

module.exports = upload;