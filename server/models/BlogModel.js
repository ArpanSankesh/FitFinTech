const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    image: {
        type: String, 
        required: true
    },
    category: {
        type: String,
        required: true,
        default: "General"
    },
    author: {
        type: String,
        default: "Admin"
    },
    date: {
        type: Number,
        default: Date.now()
    }
});

const BlogModel = mongoose.models.blog || mongoose.model('blog', blogSchema);

module.exports = BlogModel;