const express = require('express');
const { addBlog, listBlogs, removeBlog, getSingleBlog, updateBlog } = require('../controllers/blogController')
const userAuth = require('../middleware/userAuth');
const upload = require('../middleware/multer'); 

const blogRouter = express.Router();

blogRouter.get('/list', listBlogs);
blogRouter.post('/add', upload.single('image'),userAuth, addBlog); 
blogRouter.post('/remove', userAuth, removeBlog);

blogRouter.get('/single', getSingleBlog); 
blogRouter.post('/update', upload.single('image'), userAuth, updateBlog); 

module.exports = blogRouter;