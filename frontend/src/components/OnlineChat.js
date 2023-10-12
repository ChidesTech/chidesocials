import { useEffect, useState } from "react";
import "./OnlineChat.css";
import http from "../http-common";
import Swal from "sweetalert2";

export default function OnlineChat({ onlineUsers, setCurrentChat, currentUserId }) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    async function getFollowings(currentUserId) {
        try {
            const { data } = await http.get("/users/followings/" + currentUserId,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    }
                });
            setFriends(data);



        } catch (error) {
            error.response && error.response.data.message
                ? Swal.fire("Error", error.response.data.message, "error")
                : Swal.fire("Error", error.message, "error");
        }

    }

    useEffect(() => {
        getFollowings(currentUserId);
    }, [currentUserId]);
    useEffect(() => {
        setOnlineFriends(friends.filter(x => onlineUsers.includes(x._id)));
        
    }, [onlineUsers, friends]);

    return <div className="online-chat mt-2">
        <h5 className="mt-3 pt-3">Conversations</h5>

        <div className="online-chat-friend">
            <div className="online-chat-image-container">
                <img className="online-chat-image" src="/images/team-1.jpg" alt="" />
                <div className="online-chat-badge"></div>
            </div>
            <span className="online-chat-name">User 1</span>
        </div>
        {onlineUsers.map(onlineFriend => {
            return <>
                <div key={onlineFriend._id} className="online-chat-friend">
                    <div className="online-chat-image-container">
                        <img className="online-chat-image" src={onlineFriend.profilePicture} alt="" />
                        <div className="online-chat-badge"></div>
                    </div>
                    <span className="online-chat-name">{onlineFriend.username}</span>
                </div>
            </>
        })}



    </div>
}