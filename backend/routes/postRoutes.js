const express = require("express");
const router = express.Router();
const {isAuth} = require("../middlewares/utils");
const { getAllPosts, submitPost, updatePost, addComment, searchPosts, deletePost,
     deleteComment, likePost, dislikePost, searchForPosts, getPost, getAllPostsForUser,
      getAllPostsOfUser } = require("../controllers/postController");

router.get("/search",isAuth, searchPosts);
router.get("/" , isAuth, getAllPosts);
router.post("/",isAuth, submitPost);
router.put("/:id",isAuth, updatePost);
router.put("/:id/comments",isAuth, addComment);
router.delete("/:userId/:id", isAuth, deletePost);
router.delete("/:userId/:id/comments", isAuth, deleteComment );
router.put("/:id/like",isAuth, likePost);
router.put("/:id/dislike",isAuth, dislikePost);
router.get("/search/:searchText",isAuth, searchForPosts);
router.get("/:id",isAuth, getPost);
router.get("/all/:id",isAuth, getAllPostsForUser )
router.get("/mine/:id",isAuth, getAllPostsOfUser)

module.exports = router;
