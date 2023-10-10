import Header from "../components/Header";
import Message from "../components/Message";
import Conversation from "../components/Conversation";
import OnlineChat from "../components/OnlineChat";
import UserOnlineInfo from "../components/UserOnlineInfo";
import "./ChatPage.css";
import { useEffect, useRef, useState } from "react";
import http from "../http-common";
import { Link } from "react-router-dom";
import Bottombar from "../components/Bottombar";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
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


    useEffect(() => {
        socket.current = io("ws://localhost:8000");
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
        socket.current.on("getUsers", users => {
            // console.log(users);
            setOnlineUsers(user.followings.filter(x => users.some(u => u.userId === x)))
        });
    }, [user]);

    const getConversations = async (userId) => {
        try {
            // setLoading(true)
            const { data } = await http.get(`/conversations/${userId}`, {
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
        try {
            const { data } = await http.get(`/messages/${currentChat._id}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setMessages(data);

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
        console.log(receiverId);
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage
        })
        try {
            const { data } = await http.post(`/messages`, {
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
        setCurrentChat(conversation);
        getFriend(
            conversation.members.find(x => x !== user._id)
        )
        if (window.innerWidth <= 850) {
            document.getElementById("menu").style.display = "none";
            document.getElementById("box").style.display = "block";
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

    return <>
        <Header />
        <div className="chat">
            <div className="menu" id="menu">
                {/* <Link to="/users" className="m-1 btn-sm pt-2 pb-2 btn-green inline">New Conversation</Link> */}
                <div className="menu-wrapper ">
                    {/* <input type="text" placeholder="Search for friends" className="menu-input" /> */}
                    <h5 className="mt-3 pt-3">Conversations</h5>

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
                                {/* <UserOnlineInfo friend={friend && friend} /> */}

                            </div>
                            <div className="message-margin-top">
                                {messages.length === 0 ? <span className="startChat">Say Hi to start a conversation</span> :
                                    <div className='pb-44 pt-20 containerWrap'>
                                        {messages.map(message => {

                                            return <div ref={scrollToBottom}>

                                                <Message friend={friend} mine={message.sender === user._id} message={message} />
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

        <Bottombar />
    </>
}
