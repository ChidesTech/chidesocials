const express = require("express");
const Message = require("../models/messageModel");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/userModel");
const Conversation = require("../models/conversationModel");
const {isAuth} = require("../middlewares/utils");



router.post("/",isAuth, async(req, res)=>{
    const message = new Message(req.body);
    const conversation = await Conversation.findById(req.body.conversationId);

    conversation.numMessages += 1;
    await conversation.save();

    try {
        const newMessage = await message.save();
        res.status(200).send(newMessage);
    } catch (error) {
        res.status(500).send(error)
    }


});


router.get("/:conversationId",isAuth, async(req, res)=>{
    try {
        const messages = await Message.find({
            conversationId : req.params.conversationId
        })
        
        res.status(200).send(messages)
    } catch (error) {
        res.status(500).send(error)
        
    }
})


module.exports = router;
