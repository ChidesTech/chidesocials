import { Link } from "react-router-dom";
import { ArrowBack, ArrowBackIos, ArrowBackOutlined, ArrowBackSharp } from "../../node_modules/@material-ui/icons/index";
import "./UserOnlineInfo.css";

export default function UserOnlineInfo({ friend , closeChat}) {
    return <div style={{ position: "relative" }} className="online-chat">
        <div className="user-online-info">
            <div style={{ display: "flex", alignItems: "center" }}>
                <div className="online-chat-image-container">
                    <img className="online-chat-image" src={friend ? friend.profilePicture : "/images/profile.png"} alt="" />
                    <div className="online-chat-badge"></div>
                </div>
                <span className="online-chat-name">{friend && friend.username}</span>
            </div>

            <div className="text-white" onClick={closeChat}>
                <div><ArrowBackIos  />
                </div>

            </div>

        </div>

    </div>
}