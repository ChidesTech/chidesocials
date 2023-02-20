import "./MyPage.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { useEffect, useState } from "react";
import http from "../http-common";
import { Link, useHistory } from "react-router-dom";
import Footer from "../components/Footer";
import Bottombar from "../components/Bottombar";

export default function UserPage(props) {
    const [user, setUser] = useState({});
    const [followers, setFollowers] = useState([])
    const [followings, setFollowings] = useState([])
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let userId = props.match.params.id;
    const history = useHistory(); 
    async function getUser(userId) {
        try {
            const {data} = await http.get(`/users/${userId}`,{
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setUser(data.user)
            setFollowings(data.followings)
            setFollowers(data.followers)
            
        } catch (error) {
            
        }
        
    }
    

    
    useEffect(()=>{
        if(userInfo._id.toString() === userId.toString()){
            history.push("/profile");
        }
        getUser(userId);
    },[userId, history, userInfo._id])
    return (<>
        <Header />
        <div className="profile">
            <Sidebar />
            <div className="profile-right">
                <div className="profile-right-top">
                    <div className="profile-image">
                    <img className="cover-image" src={user.coverPicture && "/images/profile.png"} alt=""/>
                    <img className="display-image" src={user.profilePicture  || "/images/profile.png"} alt=""/>
                    </div>
                   
                   <div className="profile-info">
                       <h4 className="profile-info-name">{user.username}</h4>
                       <span className="profile-info-description">Software Engineer</span>
                   </div>
                </div>
                <Link style={{display:"block"}} to={`/user-profile/${user._id}`} className="btn btn-green hide-in-large"><i className="fa fa-user"></i> View Profile</Link>

                <div className="profile-right-bottom">
                    <Feed page="user-profile" id={userId} viewUser={user}/>
                    <Rightbar page="user-profile"
                     id={userId} user={user} 
                     followingStatus={userInfo.followers.includes(user._id)}
                     followers={followers}
                     followings={followings}

                     />
                </div>
            </div>
        </div>
        <Footer/>
        <Bottombar/>

    </>


    )
}