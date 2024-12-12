const express = require("express");
const router = express.Router();
const Comment = require('../schemas/comment')

router.post("/comment", async (req, res) => {
    const { content, userId, postId } = req.body;

    try {
        const comment = new Comment({ content, userId, postId });
        await comment.save();
        res.status(201).json({ message: "Comment created successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/comments", async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/comment/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: "Comment not found" });
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/comment/:id", async (req, res) => {
    const { content } = req.body;

    try {
        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { content },
            { new: true }
        );
        if (!comment) return res.status(404).json({ message: "Comment not found" });
        res.json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete("/comment/:id", async (req, res) => {
    try {
        const commentId = req.params.id;
        if (!commentId) return res.status(404).json({ message: "Comment not found" });
        await Comment.findByIdAndDelete(commentId);
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;