const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: {type : String},
    profilePicture : {type: String , default:"/images/profile.png"},
    coverPicture : {type: String , default:""},
    followers: [{type : mongoose.Types.ObjectId, ref : "User"}],
    followings: [{type : mongoose.Types.ObjectId, ref : "User"}],
    isAdmin:{type : Boolean, default: false},
    desc: {type : String},
    from: {type : String},
    relationship :{type: Number, enum: [1,2,3]}
}, { timestamps: true }
);



const User = mongoose.model("User", userSchema);

module.exports = User

