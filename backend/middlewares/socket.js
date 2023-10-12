const socketConnect = (app) => {
    
    //Socket Connection  
    const http = require('http');
  

    const server = http.createServer(app);
    const io = require("socket.io")(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    let users = [];

    function addUser(userId, socketId) {
        if (!users.some(user => user.userId === userId)) {
            users.push({ userId, socketId })
        }
    }
    function removeUser(socketId) {
        users = users.filter(x => x.socketId !== socketId)
    }

    function getUser(userId) {
        return users.find(x => x.userId === userId)
    }

    io.on("connection", socket => {
        console.log("User connected.");
        // Add users in the users array once they're connected/online
        socket.on("addUser", userId => {
            addUser(userId, socket.id);
            // Find connected/online users and send to the frontend
            io.emit("getUsers", users);

        });


        // Send/Receive Messages
        socket.on("sendMessage", function (data) {


            const receiver = users.find(x => x.userId == data.receiverId);
            if (receiver) {
                io.to(receiver.socketId).emit("getMessage", {
                    senderId: data.senderId, text: data.text
                })
            }

        })

        socket.on("disconnect", () => {
            removeUser(socket.id);
            io.emit("getUsers", users);

        })
    });
    io.listen(8000);
}


    module.exports = socketConnect;

