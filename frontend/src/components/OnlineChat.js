import { useEffect, useState } from "react";
import "./OnlineChat.css";
import http from "../http-common";
import Swal from "sweetalert2";

export default function OnlineChat({onlineUsers, setCurrentChat, currentUserId}) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    async function getFriends(currentUserId) {
        try {
            const {data} = await http.get("/users/followers/" + currentUserId,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setFriends(data);
            
            
            
        } catch (error) {
            error.response && error.response.data.message
            ? Swal.fire("Error", error.response.data.message, "error")
            : Swal.fire("Error",error.message, "error");
        }
        
    }

    useEffect(() =>{
        getFriends(currentUserId);
    }, [currentUserId]);
    useEffect(() =>{
       setOnlineFriends(friends.filter(x => onlineUsers.includes(x._id)));
    }, [onlineUsers, friends]);

    return <div className="online-chat">
        {onlineFriends.map(onlineFriend =>{
            return <div key={onlineFriend._id} className="online-chat-friend">
            <div className="online-chat-image-container">
                <img className="online-chat-image" src={onlineFriend.profilePicture} alt="" />
                <div className="online-chat-badge"></div>
            </div>
            <span className="online-chat-name">{onlineFriend.username}</span>
        </div>
        })}

        

    </div>
}