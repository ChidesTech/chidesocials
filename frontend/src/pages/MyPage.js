import "./MyPage.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { useEffect, useState } from "react";
import http from "../http-common";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Bottombar from "../components/Bottombar";
import Swal from "sweetalert2";

export default function MyPage(props) {
    const [user, setUser] = useState({});
    const [followers, setFollowers] = useState([])
    const [followings, setFollowings] = useState([])
    const [photos, setPhotos] = useState([])
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo){var userId = userInfo._id};
    async function getUser(userId) {
        try {
            const {data} = await http.get(`/users/${userId}`,{
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setUser(data.user);
            setFollowers(data.followers);
            setFollowings(data.followings);
            setPhotos(data.photos);
           
            
        } catch (error) {
            error.response && error.response.data.message
            ? Swal.fire(error.response.data.message)
            : Swal.fire(error.message);
        }
        
    }
    

    useEffect(()=>{
        if(!userInfo){
      props.history.push("/login");
      return;
        }
    },[])

    
    useEffect(()=>{
        getUser(userId);
        !userInfo && props.history.push("/login")
    },[ ])
    return (<>
        <Header />
        <div className="profile">
            <Sidebar />
            <div className="profile-right">
                <div className="profile-right-top">
                {/* <form action="" className="form popup-form">
      <input type="text" className="form-control"/>
      <input type="text" className="form-control"/>
      <button className="form-control">Submit</button>
  </form> */}
                    <div className="profile-image">
                    <img className="cover-image" src={user.coverPicture || "/images/profile.png"} alt=""/>
                    <img className="display-image" src={user.profilePicture || "/images/profile.png"} alt=""/>
                    </div>
                   
                   <div className="profile-info">
                       <h4 className="profile-info-name">{user.username}</h4>
                       <span className="profile-info-description">Software Engineer</span>
                   </div>
                <Link style={{display:"block"}} to="/edit-profile" className="btn btn-green mb-1"><i className="fa fa-user"></i> Edit Profile</Link>
                   
                </div>
                <Link style={{display:"block"}} to="/my-profile" className="btn btn-green hide-in-large"><i className="fa fa-user"></i> View Profile</Link>
                <div className="profile-right-bottom">
                    <Feed page ="profile"/>
                    <Rightbar page="profile" 
                    user={userInfo}
                    followers={followers}
                    followings={followings}
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