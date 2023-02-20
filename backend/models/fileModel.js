const mongoose = require("mongoose")
const fileModel = mongoose.Schema({
    type : {type : String},
    url : {type : String},
    user:{type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post : {type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
    
}, { timestamps: true });

const File = mongoose.model("File", fileModel);
module.exports = File;