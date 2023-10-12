import Header from "../components/Header";
import Message from "../components/Message";
import Conversation from "../components/Conversation";
import OnlineChat from "../components/OnlineChat";
import UserOnlineInfo from "../components/UserOnlineInfo";
import "./ChatPage.css";
import { useEffect, useRef, useState } from "react";
import http from "../http-common";
import { Link, useLocation } from "react-router-dom";
import Bottombar from "../components/Bottombar";
import Swal from "sweetalert2";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import openSocket from 'socket.io-client';
export default function ChatPage(props) {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [friend, setFriend] = useState(null);
    const [loading, setLoading] = useState(true);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const location = useLocation();
    const [receiverId, setReceiverId] = useState(location?.state?.id || null);
    const [showBottomBar, setShowBottomBar] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(true);




    useEffect(() => {
        socket.current = openSocket('http://localhost:8000');
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()

            })
        })
    }, [])




    const user = JSON.parse(localStorage.getItem("userInfo"));
    const scrollToBottom = useRef();

    useEffect(() => {
        //Send the user to the socket server
        socket.current.emit("addUser", user._id);
        //Get online/connected users from the socket server
        socket.current.on("getUsers", async (users) => {
            const loggedInUser = await getUser();
            const friendlist = [...loggedInUser.followings];
            setOnlineUsers(friendlist.filter(x => users.some(u => u.userId === x._id)))
        });
    }, []);

    const getConversations = async (userId) => {
        try {
            // setLoading(true)
            const { data } = await http.get(`/conversations/${userId}/`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setConversations(data);
            if (data) {
                setLoading(false)
            }

        } catch (error) {
            setLoading(false)

            error.response && error.response.data.message
                ? Swal.fire("Error", error.response.data.message, "error")
                : Swal.fire("Error", error.message, "error");
        }

    }
    const getMessages = async () => {
        setLoadingMessages(true)
        try {
            const { data } = await http.get(`/messages/${currentChat._id}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setMessages(data);
            setLoadingMessages(false);

        } catch (error) {
            error.response && error.response.data.message
                ? Swal.fire("Error", error.response.data.message, "error")
                : Swal.fire("Error", error.message, "error");
        }

    }

    const sendMessage = async (e) => {
        e.preventDefault();

        if (newMessage === "") {
            return;
        }
        //Emit message to the receiver
        const user = JSON.parse(localStorage.getItem("userInfo"));
        let receiverId = currentChat.members.find(x => x !== user._id);
        // console.log(receiverId);
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage
        })
        try {
            const { data } = await http.post(`/messages/`, {
                sender: user._id,
                text: newMessage, conversationId: currentChat._id
            }, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setMessages([...messages, data]);
            setNewMessage("");

        } catch (error) {
            error.response && error.response.data.message
                ? Swal.fire("Error", error.response.data.message, "error")
                : Swal.fire("Error", error.message, "error");
        }
    }

    function showConversation(conversation) {
        setFriend({});
        setCurrentChat(conversation);
        getFriend(
            conversation.members.find(x => x !== user._id)
        )
        setShowBottomBar(false);
        if (window.innerWidth <= 850) {
            document.getElementById("menu").style.display = "none";
            document.getElementById("box").style.display = "block";
        }
    }

    async function getUser() {
        try {
            const { data } = await http.get("/users/" + user._id,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    }
                });
            return data;

        } catch (error) {
            error.response && error.response.data.message
                ? Swal.fire("Error", error.response.data.message, "error")
                : Swal.fire("Error", error.message, "error");
        }
    }


    // Get all conversations
    useEffect(() => {
        getConversations(user._id);
    }, [])


    //Get all messages
    useEffect(() => {
        if (currentChat) {
            getMessages();
        }
    }, [currentChat]);




    //Scroll to the last message sent
    useEffect(() => {
        scrollToBottom.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // Refresh messages in real time 
    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages(prev => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat])


    //FIRST CHAT CREATION
    async function createConversation(senderId, receiverId) {

        try {
            const { data } = await http.post("/conversations", { senderId, receiverId }, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            showConversation(data.conversation);
            // setFriend(data.receiver);
            setReceiverId(null)


        } catch (error) {
            error.response && error.response.data.message
                ? Swal.fire("Error", error.response.data.message, "error")
                : Swal.fire("Error", error.message, "error");
        }
    }

    useEffect(() => {
        // getFriend()
        receiverId && createConversation(user._id, receiverId);
        receiverId && setShowBottomBar(false);
    }, [])


    const getFriend = async (friendId) => {
        try {
            const { data } = await http.get(`/users/${friendId}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });

            setFriend(data.user);
        } catch (error) {
            error.response && error.response.data.message
                ? Swal.fire("Hello Error", error.response.data.message, "error")
                : Swal.fire("Hello Error", error.message, "error");
        }

    }

    function closeChat(){
       setMessages([]);
        setShowBottomBar(true);

        if (window.innerWidth <= 850) {
            document.getElementById("menu").style.display = "block";
            document.getElementById("box").style.display = "none";
        }
    }


    return <>
        <Header />
        <div className="chat">
            <div className="menu" id="menu">
                {/* <Link to="/users" className="m-1 btn-sm pt-2 pb-2 btn-green inline">New Conversation</Link> */}
                <div className="menu-wrapper ">
                    {/* <input type="text" placeholder="Search for friends" className="menu-input" /> */}
                    <h5 className="mt-5 pt-3">Conversations</h5>

                    {loading ? <div className="m-2">Fetching Conversations ...</div> : conversations.length === 0 ? <div className="alert alert-success p-2">No Conversation Started</div> :
                        conversations.map(conversation => {
                            return <div key={conversation._id} onClick={() => showConversation(conversation)}>
                                <Conversation conversation={conversation} currentUser={user} />
                            </div>
                        })}

                </div>
            </div>
            <div className="box" id="box">
                <div className="box-wrapper">
                    {!currentChat ? <span className="startChat">Open up a conversation or start a new chat</span> :
                        <> <div className="chat-box-top">
                            <div className="chat-box-user-info">


                            </div>
                            <div className="message-margin-top">
                                {loadingMessages ? <span className="startChat text-2xl">Loading Messages ...</span> : messages.length === 0 ? <span className="startChat">Say Hi to start a conversation</span> :
                                    <div className='pb-44 pt-10 containerWrap'>
                                       <UserOnlineInfo closeChat={closeChat} friend={friend}></UserOnlineInfo>
                                        {messages.map(message => {

                                            return <div className="mt-5" ref={scrollToBottom}>

                                                <Message  friend={friend} mine={message.sender === user._id} message={message} />
                                            </div>
                                        })}
                                    </div>

                                }
                            </div>

                        </div>


                            <div className="chat-box-bottom" >
                                <textarea value={newMessage} onChange={e => setNewMessage(e.target.value)} className="chat-message-input  ps-2 pt-1" placeholder="Write your message"></textarea>
                                <button onClick={sendMessage} className="chat-submit-button  px-5 py-3 rounded-r-lg bg-success text-sm text-white"><i className="fa fa-paper-plane"></i></button>
                            </div>
                        </>


                    }

                </div>
            </div>
            <div className="online">
                <div className="online-wrapper">
                    <h5 style={{ marginBottom: ".5rem" }}>Online Friends</h5>
                    <OnlineChat onlineUsers={onlineUsers} setCurrentChat={setCurrentChat}
                        currentUserId={user._id} />

                </div>
            </div>

        </div>

{showBottomBar &&          <Bottombar />}
    </>
}
