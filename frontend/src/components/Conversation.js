import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import http from "../http-common";
import "./Conversation.css";

export default function Conversation({ conversation, currentUser }) {
    const [friend, setFriend] = useState(null);
    const [messages, setMessages] = useState([{ text: "" }]);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const getFriend = async (friendId) => {
        try {
            const { data } = await http.get(`/users/${friendId}`,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    }
                }
            );
            setFriend(data.user);
        } catch (error) {
            error.response && error.response.data.message
                ? Swal.fire("Error", error.response.data.message, "error")
                : Swal.fire("Error", error.message, "error");
        }
    }
    const getMessages = async (id) => {
        try {
            const { data } = await http.get(`/messages/${id}`,
                {
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
    useEffect(() => {
        getMessages(conversation._id);
    }, window.innerWidth >= 850 ? [conversation._id, messages] : [conversation._id]);

    useEffect(() => {
        const friendId = conversation.members.find(x => x !== currentUser._id);
        getFriend(friendId);
    }, [conversation, currentUser]);
    return <div className="conversation">
        <img src={friend && friend.profilePicture || "/images/profile.png"} alt="" className="conversation-image" />
        <div>
            <span className="conversation-name">{friend && friend.username}</span>
            <p >{messages.length > 0 && (messages.length > 0 && (messages[messages.length - 1].text).substr(0, 38).length > 35) ?
                (messages.length > 0 && (messages[messages.length - 1].text).substr(0, 38)) + " ..." : (messages.length > 0 && (messages[messages.length - 1].text).substr(0, 38))
            } </p>

        </div>
    </div>


}