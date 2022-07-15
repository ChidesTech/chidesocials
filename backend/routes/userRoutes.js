const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middlewares/utils");
const router = express.Router();
const {isAuth} = require("../middlewares/utils");



router.get("/",isAuth, async (req, res) => {
    const userList = await User.find();
    if (!userList) {
        return res.status(500).json({ success: false });
    }
    res.send({ user: userList });
});

router.get("/:id",isAuth, async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(500).json({ message: "The user wasn't found" });
        console.log({ message: "The user wasn't found" });
        return;
    }

    res.status(200).send(user);
})


router.post("/register", async (req, res) => {
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
});

router.post("/login", async (req, res) => {
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


})



router.put("/:id",isAuth, async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                res.status(500).json(error);
            }
        }


        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.status(200).json("Account updated successfully");
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    else {
        return res.status(403).json("You can only update your account")
    }
})



router.delete("/:id",isAuth, async (req, res) => {
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
});

//get all followers
router.get("/followers/:id",isAuth, async (req, res) => {
    const user = await User.findById(req.params.id);
    const followersId = user.followers;
    res.status(200).send(followersId);

})


//Get User FOllowers

router.get("/:id/followers",isAuth, async (req, res) => {

    try {
        const user = await User.findById(req.params.id);

        res.status(200).json(user.followers)



    } catch (error) {
        res.status(500).json(error);
    }

});
//follow a user

router.put("/:id/follow",isAuth, async (req, res) => {
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
});


//unfollow a user

router.put("/:id/unfollow",isAuth, async (req, res) => {
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
});


module.exports = router;
