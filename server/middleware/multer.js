const multer = require('multer');

// Configure storage
const storage = multer.diskStorage({
    filename: function(req, file, callback) {
        
        callback(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage });

module.exports = upload;