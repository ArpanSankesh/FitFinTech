const express = require('express');
const { addBlog, listBlogs, removeBlog, getSingleBlog, updateBlog, uploadEditorImage } = require('../controllers/blogController')
const userAuth = require('../middleware/userAuth');
const upload = require('../middleware/multer'); 

const blogRouter = express.Router();

blogRouter.get('/list', listBlogs);
blogRouter.post('/add', upload.single('image'), userAuth, addBlog); 
blogRouter.post('/remove', userAuth, removeBlog);

blogRouter.get('/single', getSingleBlog); 
blogRouter.post('/update', upload.single('image'), userAuth, updateBlog); 

// New Route for Editor Images
// Jodit sends files in a field named 'files[0]' by default.
blogRouter.post('/upload-editor-image', upload.single('files[0]'), uploadEditorImage);

module.exports = blogRouter;