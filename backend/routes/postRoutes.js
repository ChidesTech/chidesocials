const express = require("express");
const Post = require("../models/postModel");
const mongoose = require("mongoose");
const multer = require("multer");
const router = express.Router();
const User = require("../models/userModel");
const {isAuth} = require("../middlewares/utils");


router.get("/search",isAuth, async(req, res)=>{
    try {
        const searchText = req.query.searchText || "";
        const searchFilter =  { desc: { $regex: searchText, $options: 'i' }}
        const posts = await Post.find({...searchFilter}).populate("user");
        res.send(posts)  
    } catch (error) {
        res.status(500).json(error);
    }
  });

router.get("/" , isAuth, async(req, res)=>{
    try {
        
        const posts = await Post.find().populate("user");
        console.log(posts);
        res.send(posts)  
    } catch (error) {
        res.status(500).json(error);
    }
  });
router.post("/",isAuth, async(req, res)=>{
    const newPost = new Post(req.body);
    try {
        const post = await newPost.save();
        res.status(200).json(post);
        
    } catch (error) {
         res.status(500).json(error);
    } 
});


router.put("/:id",isAuth, async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
    if(post.user  === req.body.userId){
      await post.updateOne({$set : req.body});
      res.status(200).json('The post has been updated');
    }else{
    res.status(403).json("You are not permitted to update this post")
    }
    } catch (error) {
        res.status(500).json(error);
    }
})
router.delete("/:userId/:id", isAuth, async(req, res)=>{
    
    
    try {
        const post = await Post.findById(req.params.id);
        ;
    if(post.user.toString()  === req.params.userId.toString()){
      await post.deleteOne();
      res.status(200).json({success :'The post has been deleted'});
    }else{
    res.status(403).json("You are not permitted to delete this post")
    }
    } catch (error) {
        res.status(500).json(error);
    }
});



router.put("/:id/like",isAuth, async(req, res)=>{
    try {
    const post = await Post.findById(req.params.id);
    
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push : {likes : req.body.userId }});
            res.status(200).json("This post has been liked");
        }else{
            await post.updateOne({$pull : {likes : req.body.userId }});
            res.status(200).json("This post has been disliked");
        }
    } catch (error) {
        res.status(500).json(error)
    }

});
router.put("/:id/dislike",isAuth, async(req, res)=>{
    try {
    const post = await Post.findById(req.params.id);
    
        if(!post.dislikes.includes(req.body.userId)){
            await post.updateOne({$push : {dislikes : req.body.userId }});
            res.status(200).json("This post has been disliked");
        }else{
            await post.updateOne({$pull : {dislikes : req.body.userId }});
            res.status(200).json("This post has been liked");
        }
    } catch (error) {
        res.status(500).json(error)
    }

});


router.get("/search/:searchText",isAuth, async(req, res)=>{
    console.log("hit")
    try {
        const posts = await Post.find();
        console.log(posts);
        res.status(200).json(posts)  
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/:id",isAuth, async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)  
    } catch (error) {
        res.status(500).json(error);
    }
});



router.get("/all/:id",isAuth, async(req, res) => {
    
    try {
        const loggedInUser = await User.findById(req.params.id)
        const loggedInUserPosts = await Post.find({user : req.params.id}).populate("user");
        const friendsPosts = await Promise.all(
                        loggedInUser.followings.map(friendsId =>{
                            
                            return  Post.find({ user :friendsId }).populate("user");
                        })
                    );
                

               res.json({posts : loggedInUserPosts.concat(...friendsPosts).reverse()})
                   

    } catch (error) {
        res.status(500).json(error);
    }
    



})
router.get("/mine/:id",isAuth, async(req, res) => {
    
    try {
        const loggedInUser = await User.findOne({_id : req.params.id});
        const loggedInUserPosts = await Post.find({user : req.params.id}).populate("user");

        res.json({user : loggedInUser, posts : loggedInUserPosts.reverse()})


    } catch (error) {
        res.status(500).json(error);
    }
    



})

module.exports = router;
