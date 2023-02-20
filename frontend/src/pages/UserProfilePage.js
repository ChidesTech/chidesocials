import "./MyPage.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import UserRightbar from "../components/UserRightbar";
import { useEffect, useState } from "react";
import http from "../http-common";
import {  useHistory } from "react-router-dom";
import Footer from "../components/Footer";
import Bottombar from "../components/Bottombar";
export default function UserProfilePage(props) {
    const [user, setUser] = useState({});
    const [followers, setFollowers] = useState([])
    const [followings, setFollowings] = useState([])
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let userId = props.match.params.id;
    const history = useHistory(); 
    async function getUser(userId) {
        try {
            const {data} = await http.get(`/users/${userId}`);
            setUser(data.user)
            setFollowers(data.followers)
            setFollowings(data.followings)
            
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
                    <img className="cover-image" src={user.coverPicture || "/images/profile.png"} alt=""/>
                    <img className="display-image" src={user.profilePicture  || "/images/profile.png"} alt=""/>
                    </div>
                   
                   <div className="profile-info">
                       <h4 className="profile-info-name">{user.username}</h4>
                       <span className="profile-info-description">Software Engineer</span>
                   </div>
                </div>
                {/* <Link style={{display:"block"}} to={`/user-profile/${user._id}`} className="btn btn-green hide-in-large"><i className="fa fa-user"></i> View Profile</Link> */}

                <div className="profile-right-bottom">
                    {/* <Feed page="user-profile" id={user._id} viewUser={user}/> */}
                    <UserRightbar 
                    page="user-profile"
                     id={user._id} 
                     user={user} 
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