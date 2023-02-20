import { useEffect, useState } from "react";
import "./Rightbar.css";
import http from "../http-common";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";


export default function Rightbar({ page, id, user, followers, followings, photos }) {
    console.log(user)

    const history = useHistory()
    useEffect(() => {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (!userInfo) {
            history.push("/login");
            return;
        }




    }, [history])





    const HomeRightBar = () => {
        useEffect(() => {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));

            if (!userInfo) {
                history.push("/login");
                return;
            }




        }, [history])



        return <>
            <div className="birthday-container">
                <img src="/images/gift.gif" alt="" className="birthday-image" />
                <span className="birthday-text"> <b>Chides Tech</b> and 3 others have birthdays today</span>
            </div>
            <img src="/images/ecommerce1.jpg" alt="" className="rightbar-ad" />
            <h4 className="online-friends">Online Friends</h4>
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
        const [userFollowers, setUserFollowers] = useState([]);
        const [followersFollowings, setFollowersFollowings] = useState("followers");

        useEffect(() => {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));

            if (!userInfo) {
                history.push("/login");
                return;
            }




        }, [history])



        var profile = props.profile;

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (userInfo) { var userId = userInfo._id; }


        async function getUserFollowers(userToFollow) {
            try {
                const { data } = await http.get(`/users/${userToFollow}/followers`,
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`,
                        }
                    })

                setUserFollowers(data);

            } catch (error) {
                error.response && error.response.data.message
                    ? Swal.fire(error.response.data.message)
                    : Swal.fire(error.message);

            }

        }


        useEffect(() => {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if (!userInfo) {
                history.push("/login");
                return;
            }
            if (profile === "profile" && props.user) {
                setUser(props.user);
                return;
            }
            if (profile === "user-profile" && props.user) {
                setUser(props.user);
                props.user._id && getUserFollowers(props.user._id)
                return;
            }




        }, [props.history])


        async function followUser(userToFollow, usernameToFollow) {
            try {
                http.put(`/users/${userToFollow}/follow`, { userId },
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`,
                        }
                    })
                Swal.fire(
                    'Done',
                    `You have successfully followed ${usernameToFollow}`,
                    'success'
                )
                    .then(() => window.location.reload())

            } catch (error) {
                error.response && error.response.data.message
                    ? Swal.fire(error.response.data.message)
                    : Swal.fire(error.message);

            }

        }
        async function unfollowUser(userToUnfollow, usernameToUnfollow) {
            try {
                http.put(`/users/${userToUnfollow}/unfollow`, { userId },
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`,
                        }
                    })
                Swal.fire(
                    'Done',
                    `You have successfully unfollowed ${usernameToUnfollow} `,
                    'success'
                )
                    .then(() => window.location.reload())

            } catch (error) {
                error.response && error.response.data.message
                    ? Swal.fire(error.response.data.message)
                    : Swal.fire(error.message);

            }

        }



        return <>
            {(userFollowers && !userFollowers.includes(userId) && profile === "user-profile") && <button onClick={() => followUser(user._id, user.username)} className="btn btn-outline-green mb-2">Follow {user.username} <i className="fa fa-check"></i></button>}
            {(userFollowers && userFollowers.includes(userId) && profile === "user-profile") && <button onClick={() => unfollowUser(user._id, user.username)} className="btn btn-green mb-2">Unfollow {user.username} <i className="fa fa-check"></i></button>}
            <h4 className="rightbar-title">User Information </h4>
            <div className="rightbar-info">
                <div className="rightbar-info-item">
                    <span className="rightbar-info-key">Username:</span>
                    <span className="rightbar-info-value">{user.username}</span>
                </div>
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

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 className="rightbar-title">Photos({photos && photos.length})</h4>
                <span style={{ color: "gray" }}>See All</span>
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




    return <div className="rightbar">
        <div className="rightbar-wrapper">
            {page === "home" && <HomeRightBar />}
            {page === "profile" && <ProfileRightBar profile="profile" user={user}
            followers={followers} followings={followings}
             />}
            {page === "user-profile" && <ProfileRightBar profile="user-profile" user={user} id={id}
            followers={followers} followings={followings}
             />}
        </div>
    </div>
}