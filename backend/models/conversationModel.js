const mongoose = require("mongoose");
const conversationSchema = new mongoose.Schema({
   members : {type : Array},
   numMessages : {type : Number, default : 0},
   

}, { timestamps: true }
);


const Conversation = mongoose.model("Conversation", conversationSchema);


module.exports = Conversation

