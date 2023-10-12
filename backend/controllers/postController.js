const Post = require("../models/postModel");
const multer = require("multer");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const File = require("../models/fileModel");

exports.searchPosts =  async(req, res)=>{
    try {
        const searchText = req.query.searchText || "";
        const searchFilter =  { desc: { $regex: searchText, $options: 'i' }}
        const posts = await Post.find({...searchFilter}).populate("user");
        res.send(posts)  
    } catch (error) {
        res.status(500).json(error);
    }
  }

exports.getAllPosts = async(req, res)=>{
    try {
        
        const posts = await Post.find().populate("user");
       
        res.send(posts)  
    } catch (error) {
        res.status(500).json(error);
    }
  }


  exports.submitPost = async(req, res)=>{
    let image = new File({
        user : req.body.user,
        type : "photo",
        url : req.body.image
    });

    const newPost = new Post({
    user:req.body.user,
    desc:req.body.desc,
    image:image.url,
    });

    try {
        const post = await newPost.save();
        image.post = post._id;
        await image.save();
        res.status(200).json(post);
        
    } catch (error) {
         res.status(500).json(error);
    } 
}


exports.updatePost = async(req, res)=>{
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
}


exports.addComment =  async(req, res)=>{   
    try {
        const post = await Post.findById(req.params.id);  
        const comment = new Comment(req.body);
        const comments = await Comment.countDocuments({post : req.params.id })
         await comment.save();
          post.numComments += 1;     
          await post.save(); 
        //   console.log(post);          
        res.status(200).send({success:"Product Updated Successfully"})
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
}


exports.deletePost = async(req, res)=>{  
    try {
        const post = await Post.findById(req.params.id);
    if(post.user.toString()  === req.params.userId.toString()){
      await post.deleteOne();
      await File.deleteMany({post : req.params.id});

      res.status(200).json({success :'The post has been deleted'});
    }else{
    res.status(403).json("You are not permitted to delete this post")
    }
    } catch (error) {
        res.status(500).json(error);
    }
}


exports.deleteComment = async(req, res)=>{
    
    
    try {
        const comment = await Comment.findById(req.params.id);
        const post = await Post.findOne({_id : comment.post});
        post.numComments -=1;
        await post.save();
    if(comment.user.toString()  === req.params.userId.toString()){
      await comment.deleteOne();
      res.status(200).json({success :'The comment has been deleted'});
    }else{
    res.status(403).json("You are not permitted to delete this comment")
    }
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.likePost = async(req, res)=>{
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

}


exports.dislikePost = async(req, res)=>{
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

}


exports.searchForPosts = async(req, res)=>{
    try {
        const posts = await Post.find();
        res.status(200).json(posts)  
    } catch (error) {
        res.status(500).json(error);
    }
}


exports.getPost = async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id).populate("user");
        const comments = await Comment.find({post : req.params.id }).populate("user", "_id  profilePicture username");
        // console.log(comments)
        res.status(200).send({post, comments})
        
    } catch (error) {
        res.status(500).json(error);
    }
}


exports.getAllPostsForUser = async(req, res) => {
    
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
    



}


exports.getAllPostsOfUser = async(req, res) => {
    
    try {
        const loggedInUser = await User.findOne({_id : req.params.id});
        const loggedInUserPosts = await Post.find({user : req.params.id}).populate("user");

        res.json({user : loggedInUser, posts : loggedInUserPosts.reverse()})


    } catch (error) {
        res.status(500).json(error);
    }
    



}