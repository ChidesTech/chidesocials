const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middlewares/utils");
const File = require("../models/fileModel");

exports.getUsers =  async (req, res) => {
    const userList = await User.find();
    if (!userList) {
        return res.status(500).json({ success: false });
    }
    res.status(200).send({ user: userList });
}

exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(500).json({ message: "The user wasn't found" });
        console.log({ message: "The user wasn't found" });
        return;
    }
    const photos = await File.find({user: req.params.id, type : "photo"})

    const followers = []

    for(i in user.followers){
        let userId = user.followers[i];
        const follower = await User.findOne({_id : userId});
        followers.push(follower)
       };
    const followings = []

    for(i in user.followings){
        let userId = user.followings[i];
        const following = await User.findOne({_id : userId});
        followings.push(following)
       };

    res.status(200).send({user, followers, followings, photos});
}


exports.registerUser = async (req, res) => {
    let email = await User.findOne({ email: req.body.email });
    if (email) {
        res.status(500).send({ message: "Email has already been used" })
        return;
    };
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    await user.save();
    res.send(user);
}


exports.loginUser = async (req, res) => {
    let existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
        res.status(500).send({ message: "User does not exist" });
        return;
    }
    if (!bcrypt.compareSync(req.body.password, existingUser.password)) {
        res.status(500).send({ message: "Incorrect Password" });
        return;
    }

    let user = {
        _id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
        profilePicture: existingUser.profilePicture,
        coverPicture: existingUser.coverPicture,
        followers: existingUser.followers,
        followings: existingUser.followings,
        isAdmin: existingUser.isAdmin,
        desc: existingUser.desc,
        from: existingUser.from,
        relationship: existingUser.relationship,
        token: generateToken(existingUser)
    }
    res.status(200).send({user : user});


}


exports.updateUser =  async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(500).json("User does not exist");
        } 
          user.username = req.body.username || user.username;
          let profilePicture = new File({
            user : req.params.id,
            type : "photo",
            url : req.body.profilePicture
          })
          profilePicture = await profilePicture.save();
          user.profilePicture = req.body.profilePicture || profilePicture.url;
          user.coverPicture = req.body.coverPicture || user.coverPicture;
          await user.save();
          res.status(200).send({success : "User updated successfully", user})
        
    } catch (error) {
        return res.status(500).json(error);
    }
}


exports.deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account deleted successfully");
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    else {
        return res.status(403).json("You can only delete your account")
    }
}


exports.getFollowers =  async (req, res) => {
    const user = await User.findById(req.params.id);
    const followersId = user.followers;
    res.status(200).send(followersId);

}

exports.getUserFollowers = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);

        res.status(200).json(user.followers)
    } catch (error) {
        res.status(500).json(error);
    }

}


exports.followUser =  async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const loggedInUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await loggedInUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json({ success: "You followed this user" })

            } else {
                res.status(403).json({ message: "You already followed this user" })
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("This action is not allowed");
        console.log("This action is not allowed");
    }
}


exports.unfollowUser =  async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const loggedInUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await loggedInUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json({success: "You unfollowed this user"})

            } else {
                res.status(403).json("You do not follow this user")
            }


        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("This action is not allowed");
    }
}