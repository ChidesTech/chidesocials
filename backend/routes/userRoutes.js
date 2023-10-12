const express = require("express");
const router = express.Router();
const {isAuth} = require("../middlewares/utils");
const { getUsers, getUser, registerUser, loginUser, 
    updateUser, deleteUser, getUserFollowers, getFollowers, getFollowings,
     followUser, unfollowUser } = require("../controllers/userController");

//Get All Users
router.get("/", isAuth , getUsers);
//Get user
router.get("/:id",isAuth, getUser)
//Register user
router.post("/register", registerUser );
//Login user
router.post("/login", loginUser )
//Update a user
router.put("/:id",isAuth, updateUser)
//Delete a user
router.delete("/:id",isAuth, deleteUser );
//get all followers
router.get("/followers/:id",isAuth, getFollowers);
//get all followings
router.get("/followings/:id",isAuth, getFollowings)
//Get user FOllowers
router.get("/:id/followers",isAuth, getUserFollowers );
//follow a user
router.put("/:id/follow",isAuth, followUser);
//unfollow a user
router.put("/:id/unfollow",isAuth, unfollowUser);


// router.put("/:id",isAuth, async (req, res) => {
//     if (req.body.userId === req.params.id || req.body.isAdmin) {

//         if (req.body.password) {
//             try {
//                 const salt = await bcrypt.genSalt(10);
//                 req.body.password = await bcrypt.hash(req.body.password, salt)
//             } catch (error) {
//                 res.status(500).json(error);
//             }
//         }


//         try {
//             const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
//             res.status(200).json("Account updated successfully");
//         } catch (error) {
//             return res.status(500).json(error);
//         }
//     }

//     else {
//         return res.status(403).json("You can only update your account")
//     }
// })


module.exports = router;
