import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyRightbar.css";


export default function Rightbar({page,id, user, followers, followings, photos}) {
    
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
    const [followersFollowings, setFollowersFollowings] = useState("followers");

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
<h4 className="rightbar-title">Photos ({photos.length})</h4>
<Link to={`/photos/${user._id}`}>
<span style={{color: "gray"}}>See All</span>

</Link>
</div>

<div className="rightbar-followings">
               {
                photos && photos.map(photo =>{
                    return <Link to={`/post/${photo.post}`} className="rightbar-following">
                    <img src={photo.url} alt="" className="rightbar-following-image" />
                    {/* <span className="rightbar-following-name">Margot Robbie</span> */}
                </Link>
                })
               }  
            </div>

            <div className="followers-followings">
                    <div onClick={() => setFollowersFollowings("followers")} className={followersFollowings === "followers" && "followers-followings-active"}>Followers</div>
                    <div onClick={() => setFollowersFollowings("followings")} className={followersFollowings === "followings" && "followers-followings-active"}>Followings</div>
               
                </div>
                <br />
                {
                    followersFollowings === "followers" && <><h4 className="rightbar-title">All Followers</h4>
                    <ul className="rightbar-friendlist">
                        {followers && followers.map(follower => {
                            return <li className="rightbar-friend">
                                <div className="rightbar-profileimage-container">
                                    <img src={follower.profilePicture} alt="" className="rightbar-profile-image" />
                                    {/* <span className="rightbar-online"></span> */}
                                </div>
                                <span className="rightbar-username">{follower.username}</span>
                            </li>
                        })}
                    </ul>
                    </>
                }
            
            {
                followersFollowings === "followings" && <>
                <h4 className="rightbar-title">All Followings</h4>
            <ul className="rightbar-friendlist">
                {followings && followings.map(following => {
                    return <li className="rightbar-friend">
                        <div className="rightbar-profileimage-container">
                            <img src={following.profilePicture} alt="" className="rightbar-profile-image" />
                            {/* <span className="rightbar-online"></span> */}
                        </div>
                        <span className="rightbar-username">{following.username}</span>
                    </li>
                })}
            </ul></>
            }
            
            <hr />
            
        </>
    }
    return <div className="myrightbar">
                <Link style={{display:"block"}} to="/profile" className="btn btn-green"><i className="fa fa-list"></i> View Timeline</Link>

        <div className="rightbar-wrapper">
        {page === "home" && <HomeRightBar/> } 
        {page ==="profile" && <ProfileRightBar profile="profile" user={user} followers={followers} followings={followings}   /> }
        {page==="user-profile" && <ProfileRightBar profile="user-profile" user={user} id={id} followers={followers} followings={followings} /> }
            
        </div>
    </div>
}