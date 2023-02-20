import Header from "../components/Header";
import Message from "../components/Message";
import Conversation from "../components/Conversation";
import OnlineChat from "../components/OnlineChat";
import UserOnlineInfo from "../components/UserOnlineInfo";
import "./ChatPage.css";
import { useEffect, useRef, useState } from "react";
import http from "../http-common";

import Bottombar from "../components/Bottombar";
import Swal from "sweetalert2";
export default function ChatOnePage(props) {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [friend, setFriend] = useState(null);
    const [loading, setLoading] = useState(true);
    const [receiverId, setReceiverId] = useState(props.match.params.id);
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const scrollToBottom = useRef();

    const getConversations = async (userId) => {
        try {
            setLoading(true);
            const { data } = await http.get(`/conversations/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setConversations(data)
            if(data){
            setLoading(false);
            }
          // if(receiver){
                //     createConversation(userId, receiverId)
                // }
        } catch (error) {
            error.response && error.response.data.message
            ? Swal.fire("Error", error.response.data.message, "error")
            : Swal.fire("Error",error.message, "error");
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
            : Swal.fire("Error",error.message, "error");
        }

    }
    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            const { data } = await http.post(`/messages`, {sender : user._id ,
             text : newMessage, conversationId : currentChat._id}, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setMessages([...messages, data]);
            setNewMessage("");

        } catch (error) {
            error.response && error.response.data.message
            ? Swal.fire("Error", error.response.data.message, "error")
            : Swal.fire("Error",error.message, "error");
        }

    }

    function showConversation(conversation) {
        setCurrentChat(conversation);
        
        if(window.innerWidth <= 850){
            document.getElementById("menu").style.display = "none";
            document.getElementById("box").style.display = "block";
        }
        
        
    }

    async function createConversation (senderId , receiverId ){
        
        try {
           const {data} = await http.post("/conversations", {senderId, receiverId}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        });   
           showConversation(data.conversation);
           setFriend(data.receiver);
           
            
        } catch (error) {
            error.response && error.response.data.message
            ? Swal.fire("Error", error.response.data.message, "error")
            : Swal.fire("Error",error.message, "error");
        }
    }


    useEffect(() => {
        getConversations(user._id)
    }, [])

    useEffect(() =>{
        getFriend()
        createConversation(user._id, receiverId);
    }, [user._id, receiverId])

    useEffect(()=>{
        if(currentChat){
            getMessages()
        }
    },[currentChat])

    useEffect(()=>{
        scrollToBottom.current?.scrollIntoView({behavior : "smooth"})
    }, [messages])



    const getFriend = async () =>{
        
        try {
            const {data} = await http.get(`/users/${receiverId}`,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
           setFriend(data.user);
        } catch (error) {
            error.response && error.response.data.message
            ? Swal.fire("Error", error.response.data.message, "error")
            : Swal.fire("Error",error.message, "error");
        }
         
    }
    
    return <>
        <Header />
        <div className="chat">
            <div className="menu" id="menu">
                <div className="menu-wrapper">
                    <input type="text" placeholder="Search for friends" className="menu-input" />
                    <h5 className="mt-3">Conversations</h5>

                    {loading ? <div className="m-2">Fetching Conversations ...</div> : conversations.length === 0 ? <div className="alert alert-success p-2">No Conversation Started</div> : 
                    conversations.map(conversation => {
                        return <div key={conversation._id} onClick={() => showConversation(conversation) }>
                        <Conversation   conversation={conversation} currentUser={user} />
                        </div>
                    })}

                </div>
            </div>
            <div className="box" id="box">
                <div className="box-wrapper">
                    {!currentChat ? <span className="startChat">Open up a conversation or start a new chat</span> :
                        <> <div className="chat-box-top">
                        <div className="chat-box-user-info">
                        <UserOnlineInfo friend={friend && friend} />

                        </div>
                        <div className="message-margin-top">
                            {messages.length === 0 ? <span className="startChat">Say Hi to start a conversation</span> : messages.map(message=>{
                             return <div ref={scrollToBottom}>
                                 
                                 <Message friend={friend}  mine={message.sender === user._id} message={message}/>

                                 

                             </div> 
                           
                            })}
                            </div>
                            
                        </div>


                 <div className="chat-box-bottom">
                    <textarea value={newMessage} onChange={e => setNewMessage(e.target.value)} className="chat-message-input" placeholder="Write your message"></textarea>
                    <button onClick={sendMessage} className="chat-submit-button btn btn-success"><i className="fa fa-paper-plane"></i></button>
                </div>
                        </>


                    }

                </div>
            </div>
            <div className="online">
                <div className="online-wrapper">
                    <h5 style={{marginBottom:".5rem"}}>Online Friends</h5>
                    
                    {/* <OnlineChat />
                    <OnlineChat />
                    <OnlineChat />
                    <OnlineChat />
                    <OnlineChat />
                    <OnlineChat />
                    <OnlineChat />
                    <OnlineChat />
                    <OnlineChat />
                    <OnlineChat />
                    <OnlineChat />
                    <OnlineChat />
                    <OnlineChat />
                    <OnlineChat /> */}
                </div>
            </div>

        </div>

  <Bottombar/>
    </>
}