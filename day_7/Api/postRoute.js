const express = require("express");
const router = express.Router();
const Post = require('../schemas/post')


router.post("/post", async (req, res) => {
    const { title, content, userId } = req.body;

    try {
        const post = new Post({ title, content, userId });
        await post.save();
        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/post/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/post/:id", async (req, res) => {
    const { title, content } = req.body;

    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/post/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        if (!postId) return res.status(400).json({ message: "field required" });

        const existingPost = await Post.findById(postId);
        if (!existingPost)
            return res.status(404).json({ message: "Post not found" });

        const delPost = await Post.deleteOne({ _id: postId });
        res.status(200).json({ message: "Post successfully deleted", delPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;