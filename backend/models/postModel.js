const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId,ref: 'User' },
    desc:{type: String}, 
    image:{type: String},
    likes:{type: Array, default:[]},
    dislikes:{type: Array, default:[]},
    numComments : {type : Number, default : 0}
},{timestamps: true}
);


 
const Post  = mongoose.model("Post", postSchema);

module.exports = Post 

