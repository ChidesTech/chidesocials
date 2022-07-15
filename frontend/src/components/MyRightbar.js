import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyRightbar.css";


export default function Rightbar({page,id, user}) {
    
   





    const HomeRightBar = () => {
        return <>
            <div className="birthday-container">
                <img src="/images/gift.gif" alt="" className="birthday-image" />
                <span className="birthday-text"> <b>Chides Tech</b> and 3 others have birthdays today</span>
            </div>
            <img src="/images/ecommerce1.jpg" alt="" className="rightbar-ad" />
            <h4 className="online-friends">Onine Friends</h4>
            <ul className="rightbar-friendlist">

                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-1.jpg" alt="" className="rightbar-profile-image" />
                        <span className="rightbar-online"></span>
                    </div>
                    <span className="rightbar-username">Sharon George</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-2.jpg" alt="" className="rightbar-profile-image" />
                        <span className="rightbar-online"></span>
                    </div>
                    <span className="rightbar-username">Blake Lively</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-3.jpg" alt="" className="rightbar-profile-image" />
                        <span className="rightbar-online"></span>
                    </div>
                    <span className="rightbar-username">Genevieve Ekeinde</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-4.jpg" alt="" className="rightbar-profile-image" />
                        <span className="rightbar-online"></span>
                    </div>
                    <span className="rightbar-username">Ralf Ragnick</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-5.jpg" alt="" className="rightbar-profile-image" />
                        <span className="rightbar-online"></span>
                    </div>
                    <span className="rightbar-username">Jin Sun Park</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-8.jpg" alt="" className="rightbar-profile-image" />
                        <span className="rightbar-online"></span>
                    </div>
                    <span className="rightbar-username">team-1 Nwosu</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-5.jpg" alt="" className="rightbar-profile-image" />
                        <span className="rightbar-online"></span>
                    </div>
                    <span className="rightbar-username">team-1 Nwosu</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-6.jpg" alt="" className="rightbar-profile-image" />
                        <span className="rightbar-online"></span>
                    </div>
                    <span className="rightbar-username">team-1 Nwosu</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-7.jpg" alt="" className="rightbar-profile-image" />
                        <span className="rightbar-online"></span>
                    </div>
                    <span className="rightbar-username">team-1 Nwosu</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-8.jpg" alt="" className="rightbar-profile-image" />
                        <span className="rightbar-online"></span>
                    </div>
                    <span className="rightbar-username">team-1 Nwosu</span>
                </li>



            </ul>
        </>
    }

    const ProfileRightBar = (props) => {
    const [user, setUser] = useState("");

        var profile = props.profile;
       
       


        useEffect(()=>{
            if(profile ==="profile" && props.user){
                setUser(props.user);
            return;
        }
            if(profile==="user-profile" && props.user){
                setUser(props.user);
               
                return;
             }
            

           
            
        },[])




        return <>

           {profile==="user-profile"  && <button className="btn btn-green mb-2">Follow {user.username} <i className="fa fa-check"></i></button>}
           <h4 className="rightbar-title">User Information {user && user.username}</h4>
            <div className="rightbar-info">
                <div className="rightbar-info-item">
                    <span className="rightbar-info-key">Lives In:</span>
                    <span className="rightbar-info-value">Awka, Anambra</span>
                </div>
                <div className="rightbar-info-item">
                    <span className="rightbar-info-key">From:</span>
                    <span className="rightbar-info-value">Orsu, Imo</span>
                </div>
                <div className="rightbar-info-item">
                    <span className="rightbar-info-key">Relationship:</span>
                    <span className="rightbar-info-value">Single</span>
                </div>
            </div>

<div style={{display:"flex", justifyContent:"space-between"}}>
<h4 className="rightbar-title">Mutual Friends (7)</h4>
 <span style={{color: "blue"}}>See All</span>
</div>

            <div className="rightbar-followings">
                <div className="rightbar-following">
                    <img src="/images/team-1.jpg" alt="" className="rightbar-following-image"/>
                <span className="rightbar-following-name">Blake Lively</span>
                </div>
                <div className="rightbar-following">
                    <img src="/images/team-2.jpg" alt="" className="rightbar-following-image"/>
                <span className="rightbar-following-name">Turing Abidjan</span>
                </div>
                <div className="rightbar-following">
                    <img src="/images/team-3.jpg" alt="" className="rightbar-following-image"/>
                <span className="rightbar-following-name">Margot Robbie</span>
                </div>
                <div className="rightbar-following">
                    <img src="/images/nwosu.jpg" alt="" className="rightbar-following-image"/>
                <span className="rightbar-following-name">Desmond Nwosu</span>
                </div>
                <div className="rightbar-following">
                    <img src="/images/nwosu.jpg" alt="" className="rightbar-following-image"/>
                <span className="rightbar-following-name">Desmond Nwosu</span>
                </div>
                <div className="rightbar-following">
                    <img src="/images/nwosu.jpg" alt="" className="rightbar-following-image"/>
                <span className="rightbar-following-name">Desmond Nwosu</span>
                </div>
            </div>
            <h4 className="rightbar-title">All Friends</h4>
            <ul className="rightbar-friendlist">

                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-1.jpg" alt="" className="rightbar-profile-image" />
                        {/* <span className="rightbar-online"></span> */}
                    </div>
                    <span className="rightbar-username">Sharon George</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-2.jpg" alt="" className="rightbar-profile-image" />
                        {/* <span className="rightbar-online"></span> */}
                    </div>
                    <span className="rightbar-username">Blake Lively</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-3.jpg" alt="" className="rightbar-profile-image" />
                        {/* <span className="rightbar-online"></span> */}
                    </div>
                    <span className="rightbar-username">Genevieve Ekeinde</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-4.jpg" alt="" className="rightbar-profile-image" />
                        {/* <span className="rightbar-online"></span> */}
                    </div>
                    <span className="rightbar-username">Ralf Ragnick</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-5.jpg" alt="" className="rightbar-profile-image" />
                        {/* <span className="rightbar-online"></span> */}
                    </div>
                    <span className="rightbar-username">Jin Sun Park</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-8.jpg" alt="" className="rightbar-profile-image" />
                        {/* <span className="rightbar-online"></span> */}
                    </div>
                    <span className="rightbar-username">team-1 Nwosu</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-5.jpg" alt="" className="rightbar-profile-image" />
                        <span className="rightbar-online"></span>
                    </div>
                    <span className="rightbar-username">team-1 Nwosu</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-6.jpg" alt="" className="rightbar-profile-image" />
                        <span className="rightbar-online"></span>
                    </div>
                    <span className="rightbar-username">team-1 Nwosu</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-7.jpg" alt="" className="rightbar-profile-image" />
                        {/* <span className="rightbar-online"></span> */}
                    </div>
                    <span className="rightbar-username">team-1 Nwosu</span>
                </li>
                <li className="rightbar-friend">
                    <div className="rightbar-profileimage-container">
                        <img src="/images/team-8.jpg" alt="" className="rightbar-profile-image" />
                        {/* <span className="rightbar-online"></span> */}
                    </div>
                    <span className="rightbar-username">team-1 Nwosu</span>
                </li>



            </ul>
        </>
    }
    return <div className="myrightbar">
                <Link style={{display:"block"}} to="/profile" className="btn btn-green"><i className="fa fa-list"></i> View Timeline</Link>

        <div className="rightbar-wrapper">
        {page === "home" && <HomeRightBar/> } 
        {page ==="profile" && <ProfileRightBar profile="profile" user={user}   /> }
        {page==="user-profile" && <ProfileRightBar profile="user-profile" user={user} id={id}  /> }
            
        </div>
    </div>
}