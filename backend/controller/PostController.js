const Post = require('../model/PostModel');

const createPost = async (req, res) => {
    try {
        const { title, content, news } = req.body;

        if (!title || !content || !req.file) {
            return res.status(400).json({ error: "Name, message, and image file are required" });
        }

        const imageBuffer = req.file.buffer; // multer stores file buffer here

        const post = await Post.create({
            title,
            content,
            news,
            imageBuffer,
            image: req.file.originalname // optional, store file name or path
        });

        return res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// get All Posts
const getPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }); // newest first

        if (posts.length === 0) {
            return res.status(404).json({ error: "No posts available" });
        }

        // convert imageBuffer to base64 string for each post
        const postsWithBase64 = posts.map(post => ({
            ...post._doc,
            image: post.imageBuffer ? post.imageBuffer.toString('base64') : null,
        }));

        res.status(200).json({
            message: "Posts fetched successfully",
            posts: postsWithBase64, // send modified posts here
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// government Related Post
const governmentPost = async (req, res) => {
    try {
        const posts = await Post.find({ news: 'government' }).sort({ createdAt: -1 });
        if (posts.length === 0) {
            return res.status(404).json({ error: "No posts available" });
        }

        // convert imageBuffer to base64 string for each post
        const postsWithBase64 = posts.map(post => ({
            ...post._doc,
            image: post.imageBuffer ? post.imageBuffer.toString('base64') : null,
        }));

        res.status(200).json({
            message: "Posts fetched successfully",
            posts: postsWithBase64, // send modified posts here
        });
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

// All games Related Post
const gamesPost = async (req, res) => {
    try {
        const posts = await Post.find({ news: 'games' }).sort({ createdAt: -1 });
        if (posts.length === 0) {
            return res.status(404).json({ error: "No posts available" });
        }

        // convert imageBuffer to base64 string for each post
        const postsWithBase64 = posts.map(post => ({
            ...post._doc,
            image: post.imageBuffer ? post.imageBuffer.toString('base64') : null,
        }));

        res.status(200).json({
            message: "Posts fetched successfully",
            posts: postsWithBase64, // send modified posts here
        });
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

// music related Post 
const musicPost = async (req, res) => {
    try {
        const posts = await Post.find({ news: 'music' }).sort({ createdAt: -1 });
        if (posts.length === 0) {
            return res.status(404).json({ error: "No posts available" });
        }

        // convert imageBuffer to base64 string for each post
        const postsWithBase64 = posts.map(post => ({
            ...post._doc,
            image: post.imageBuffer ? post.imageBuffer.toString('base64') : null,
        }));

        res.status(200).json({
            message: "Posts fetched successfully",
            posts: postsWithBase64, // send modified posts here
        });
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

// technology related Post
const technologyPost = async (req, res) => {
    try {
        const posts = await Post.find({ news: 'technology' }).sort({ createdAt: -1 });
        if (posts.length === 0) {
            return res.status(404).json({ error: "No posts available" });
        }

        // convert imageBuffer to base64 string for each post
        const postsWithBase64 = posts.map(post => ({
            ...post._doc,
            image: post.imageBuffer ? post.imageBuffer.toString('base64') : null,
        }));

        res.status(200).json({
            message: "Posts fetched successfully",
            posts: postsWithBase64, // send modified posts here
        });
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

// trend related Posts
const celebrityPost = async (req, res) => {
    try {
        const posts = await Post.find({ news: 'celebrity' }).sort({ createdAt: -1 });
        if (posts.length === 0) {
            return res.status(404).json({ error: "No posts available" });
        }

        // convert imageBuffer to base64 string for each post
        const postsWithBase64 = posts.map(post => ({
            ...post._doc,
            image: post.imageBuffer ? post.imageBuffer.toString('base64') : null,
        }));

        res.status(200).json({
            message: "Posts fetched successfully",
            posts: postsWithBase64, // send modified posts here
        });
    }
    catch (err) {
        return res.status(500).json(err)
    }
}


// education Related All Post
const educationPost = async (req, res) => {
    try {
        const posts = await Post.find({ news: 'education' }).sort({ createdAt: -1 });
        if (posts.length === 0) {
            return res.status(404).json({ error: "No posts available" });
        }

        // convert imageBuffer to base64 string for each post
        const postsWithBase64 = posts.map(post => ({
            ...post._doc,
            image: post.imageBuffer ? post.imageBuffer.toString('base64') : null,
        }));

        res.status(200).json({
            message: "Posts fetched successfully",
            posts: postsWithBase64, // send modified posts here
        });
    }
    catch (err) {
        return res.status(500).json(err)
    }
}





// get singlePost by Id
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findOne(id);
        if (!post) {
            return res.status(409).json({ error: "Invalid Post ID" })
        }
        return res.status(200).json(post)
    }
    catch (error) {
        return res.status(500).json(error)
    }
}



// update Single post By Id
const updatePostById = async (req, res) => {
    try {
        const { id } = req.params
        const { title, content } = req.body;
        const updateData = { title, content };

        if (req.file) {
            updateData.imageBuffer = req.file.buffer;
            updateData.image = req.file.originalname;
        }

        const post = await Post.findByIdAndUpdate(id, updateData, { new: true });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        return res.status(200).json(post);
    }
    catch (error) {
        return res.status(500).json(error)
    }
}




// delete Post by Id
const deletePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ error: 'Invalid Post For Delete' })
        }
        return res.status(200).json({ message: "Deleted Successfully" })
    }
    catch (error) {
        return res.status(500).json(error)
    }
}


module.exports = {
    createPost,
    getPost,
    getPostById,
    updatePostById,
    deletePostById,
    governmentPost,
    celebrityPost,
    gamesPost,
    educationPost,
    musicPost,
    technologyPost
}