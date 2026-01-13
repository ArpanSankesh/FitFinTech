const BlogModel = require('../models/BlogModel');
const cloudinary = require('cloudinary').v2;
const fs = require('fs'); 

// 1. API to Add a New Blog
const addBlog = async (req, res) => {
    try {
        const { title, description, category, author } = req.body;
        const imageFile = req.file; 

        if (!imageFile) {
            return res.json({ success: false, message: "Cover file is required" });
        }

        console.log("1. File Received:", imageFile.originalname);
        console.log("2. Mimetype:", imageFile.mimetype);

        // --- SAFE UPLOAD LOGIC ---
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: 'auto' 
        });

        console.log("3. Cloudinary Upload Success:", imageUpload.secure_url);

        const blog = new BlogModel({
            title,
            description,
            category,
            author,
            image: imageUpload.secure_url,
            mediaType: imageUpload.resource_type, 
            date: Date.now()
        });

        await blog.save();
        console.log("4. Database Save Success");

        if (fs.existsSync(imageFile.path)) {
            fs.unlinkSync(imageFile.path);
        }

        res.json({ success: true, message: "Blog Added Successfully" });

    } catch (error) {
        console.log("❌ CRITICAL ERROR IN ADD BLOG:", error);
        
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({ success: false, message: error.message });
    }
}

// 2. List All Blogs
const listBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find({});
        res.json({ success: true, blogs });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// 3. Remove Blog
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

// 4. Get Single Blog
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

// 5. Update Blog
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
            console.log("Updating file:", req.file.originalname);
            
            const imageUpload = await cloudinary.uploader.upload(req.file.path, { 
                resource_type: 'auto' 
            });
            
            blog.image = imageUpload.secure_url;
            blog.mediaType = imageUpload.resource_type;

            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
        }

        await blog.save();
        res.json({ success: true, message: "Blog Updated Successfully" });

    } catch (error) {
        console.log("❌ CRITICAL ERROR IN UPDATE:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// 6. Upload Editor Image (For Jodit)
const uploadEditorImage = async (req, res) => {
    try {
        // Jodit sends the file with a field name like "files[0]"
        // If you use upload.any() in routes, req.files will be an array
        // If you use upload.single(), req.file will be populated
        
        const file = req.file;

        if (!file) {
            return res.json({ success: false, message: "No image uploaded" });
        }

        const imageUpload = await cloudinary.uploader.upload(file.path, {
            resource_type: 'auto'
        });

        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        // Return format strictly required by Jodit: { success: true, data: { files: [url] } }
        res.json({
            success: true,
            data: {
                files: [imageUpload.secure_url]
            }
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

module.exports = { addBlog, listBlogs, removeBlog, getSingleBlog, updateBlog, uploadEditorImage };