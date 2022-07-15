const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/userModel");
const Conversation = require("../models/conversationModel.js");

router.post("/", async (req, res)=>{

    const receiver = await User.findById(req.body.receiverId)
    
   

   const commonConversation = await Conversation.findOne({
    members: {$all : [req.body.receiverId, req.body.senderId] }
  });


  if(commonConversation){
      res.send({conversation :commonConversation, receiver : receiver});
      
      return;
  }


   const conversation = new Conversation({
       members : [req.body.senderId, req.body.receiverId]
   })

    try {
         const newConversation = await  conversation.save();
        res.send({conversation : newConversation , receiver: receiver});
        
    } catch (error) {
        res.status(500).send(error)
    }

})
router.get("/:id", async (req, res)=>{
   
    try {
        const conversation = await Conversation.find({
            members: {$in : [req.params.id]}
        } ).sort({updatedAt : -1})
        res.status(200).send(conversation);

        
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router;
