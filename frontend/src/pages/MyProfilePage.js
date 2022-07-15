import "./MyPage.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MyRightbar from "../components/MyRightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Bottombar from "../components/Bottombar";

export default function MyProfilePage(props) {
    const [user, setUser] = useState({});
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo){var userId = userInfo._id};
    async function getUser(userId) {
        try {
            const {data} = await axios.get(`http://localhost:5000/api/users/${userId}`);
            setUser(data)
            
        } catch (error) {
            
        }
        
    }
    

    useEffect(()=>{
        if(!userInfo){
      props.history.push("/login");
      return;
        }
    },[props.history, userInfo])

    
    useEffect(()=>{
        getUser(userId);
        !userInfo && props.history.push("/login")
    },[userId, props.history, userInfo])
    return (<>
        <Header />
        <div className="profile">
            <Sidebar />
            <div className="profile-right">
                <div className="profile-right-top">
                    <div className="profile-image">
                    <img className="cover-image" src="/images/desmond.jpg" alt=""/>
                    <img className="display-image" src="/images/nwosu.jpg" alt=""/>
                    </div>
                   
                   <div className="profile-info">
                       <h4 className="profile-info-name">{user.username}</h4>
                       <span className="profile-info-description">Software Engineer</span>
                   </div>
                </div>
                <div className="profile-right-bottom">
                    {/* <Feed  page ="profile"/> */}
                    <MyRightbar page="profile" user={user}/>
                </div>
            </div>
        </div>
 <Footer/>
<Bottombar/>
 
    </>


    )
}