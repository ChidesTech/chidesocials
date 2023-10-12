const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cors = require("cors");
const Post = require("./models/postModel");
const User = require("./models/userModel");
const Conversation = require("./models/conversationModel");
const Message = require("./models/messageModel");
const path = require("path");
const socketConnect = require("./middlewares/socket")
const app = express();

socketConnect(app);

app.use(cors());
app.options("*", cors());

require('dotenv/config');

const api = process.env.API_URL;

app.use(express.json());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
 

app.use(`${api}/posts`, postRoutes);
app.use(`${api}/users`, userRoutes);
app.use(`${api}/conversations`, conversationRoutes);
app.use(`${api}/messages`, messageRoutes);




app.get("/api/search", async(req, res)=>{
    try {
        const searchText = req.query.searchText || "";
        const postSearchFilter =  { desc: { $regex: searchText, $options: 'i' }}
        const userSearchFilter =  { username: { $regex: searchText, $options: 'i' }}
        const posts = await Post.find({...postSearchFilter}).populate("user");
        const users = await User.find({...userSearchFilter});
        res.send({posts, users})  
    } catch (error) {
        res.status(500).json(error);
    }
  });


  app.get("/api/deletemany", async (req, res) =>{
    
    await User.deleteMany();
    await Post.deleteMany();
    await Conversation.deleteMany();
    await Message.deleteMany();
    res.send("All deleted")
  })
  
 

const MongoDBUri =
process.env.ATLAS_URL
  //  process.env.DB_URL;
   
mongoose.connect(MongoDBUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(result => {
      console.log("MongoDB is connected")
   }).catch(err => console.log(err))




// const __dirnames = path.resolve(); 
// app.use('/uploads', express.static(path.join(__dirnames, '/uploads')));
// app.use(express.static(path.join(__dirname, '/../frontend/build')));
   
// app.get('*', (req, res) => {
//     res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
//   });


app.listen(process.env.PORT || 5000, (req, res)=>{
    console.log("Listening on port 5000 at http://localhost:5000");
});