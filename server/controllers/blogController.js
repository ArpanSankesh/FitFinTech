const BlogModel = require('../models/BlogModel');
const cloudinary = require('cloudinary').v2;

// 1. API to Add a New Blog
const addBlog = async (req, res) => {
    try {
        const { title, description, category, author } = req.body;
        const imageFile = req.file; // This comes from Multer

        if (!imageFile) {
            return res.json({ success: false, message: "Image is required" });
        }

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: 'image'
        });

        const blog = new BlogModel({
            title,
            description,
            category,
            author,
            image: imageUpload.secure_url, 
            date: Date.now()
        });

        await blog.save();
        res.json({ success: true, message: "Blog Added Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const listBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find({});
        res.json({ success: true, blogs });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const removeBlog = async (req, res) => {
    try {
        const id = req.body.id;
        await BlogModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Blog Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.query;
        const blog = await BlogModel.findById(id);
        res.json({ success: true, blog });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


const updateBlog = async (req, res) => {
    try {
        const { id, title, description, category, author } = req.body;
        const blog = await BlogModel.findById(id);

        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }

     
        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.category = category || blog.category;
        blog.author = author || blog.author;

        
        if (req.file) {
            const imageUpload = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' });
            blog.image = imageUpload.secure_url;
        }

        await blog.save();
        res.json({ success: true, message: "Blog Updated Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


module.exports = { addBlog, listBlogs, removeBlog, getSingleBlog, updateBlog };

