import "./MyPage.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MyRightbar from "../components/MyRightbar";
import { useEffect, useState } from "react";
import http from "../http-common";
import Footer from "../components/Footer";
import Bottombar from "../components/Bottombar";

export default function MyProfilePage(props) {
    const [user, setUser] = useState({});
    const [followers, setFollowers] = useState([])
    const [followings, setFollowings] = useState([])
    const [photos, setPhotos] = useState([])
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo){var userId = userInfo._id};
    async function getUser(userId) {
        try {
            const {data} = await http.get(`/users/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setUser(data.user)
            setFollowers(data.followers)
            setFollowings(data.followings)
            setPhotos(data.photos)
            
        } catch (error) {
            
        }
        
    }
    

    useEffect(()=>{
        if(!userInfo){
      props.history.push("/login");
      return;
        }
    },[props.history])

    
    useEffect(()=>{
        getUser(userId);
        !userInfo && props.history.push("/login")
    },[userId, props.history])
    return (<>
        <Header />
        <div className="profile">
            <Sidebar />
            <div className="profile-right">
                <div className="profile-right-top">
                    <div className="profile-image">
                    <img className="cover-image" src={user.coverPicture || "/images/profile.png"} alt=""/>
                    <img className="display-image" src={user.profilePicture || "/images/profile.png"} alt=""/>
                    </div>
                   
                   <div className="profile-info">
                       <h4 className="profile-info-name">{user.username}</h4>
                       <span className="profile-info-description">Software Engineer</span>
                   </div>
                </div>
                <div className="profile-right-bottom">
                    {/* <Feed  page ="profile"/> */}
                    <MyRightbar page="profile"
                     user={user}
                     followers = {followers}
                     followings = {followings}
                     photos={photos}
                    
                    />
                </div>
            </div>
        </div>
 <Footer/>
<Bottombar/>
 
    </>


    )
}