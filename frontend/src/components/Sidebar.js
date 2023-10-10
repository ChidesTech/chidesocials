import { RssFeed } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { ArrowForwardIosOutlined, Bookmark, Chat, Event, Group, HelpOutline, PlayCircleFilledOutlined, School, ShoppingCart, WorkOutline } from "../../node_modules/@material-ui/icons/index";
import "./Sidebar.css";
import http from "../http-common";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";


export default function Sidebar() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const history = useHistory();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   
    if (userInfo) {
        var userId = userInfo._id;
    }

    async function getUsers() {
        setLoading(true);
        try {
       
      const { data } = await http.get("/users",
      {
          headers: {
              Authorization: `Bearer ${userInfo.token}`,
          }
      }
      );
            setUsers(data.user); 
            setLoading(false);

           
        } catch (error) {
            setLoading(false);

            error.response && error.response.data.message
            ? setError(error.response.data.message)
            : setError(error.message);
        }

    }
    useEffect(() => {
        !userInfo && history.push("/login")
        let unmounted = false;

        getUsers();
        if (users.length > 0) {
            setLoading(false);
        }
 
 
        return () => {
            unmounted = true;
        }
        

    }, [  ]); 


        
   
   
//     async function getUserFollowers(userToFollow) {
//         try {
//         const {data} = await http.get(`/users/${userToFollow}/followers`)
            
//             setUserFollowers(data);

//         } catch (error) {
//             error.response && error.response.data.message
//   ? console.log(error.response.data.message)
//   : console.log(error.message);
            
//         }
        
//     }

    async function followUser(userToFollow, usernameToFollow) {
        try {
        const {data} = await http.put(`/users/${userToFollow}/follow`, {userId},
         {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        )
        data.success && Swal.fire(
            'Done',
            `You have successfully followed ${usernameToFollow}`,
            'success'
          )
          .then(()=> window.location.reload())

        } catch (error) {
            error.response && error.response.data.message
  ? Swal.fire(error.response.data.message)
  : Swal.fire(error.message);
            
        }
        
    }
    async function unfollowUser(userToUnfollow, usernameToUnfollow) {
        try {
       const {data} = await http.put(`/users/${userToUnfollow}/unfollow`, {userId},
         {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        );
     if(data.success){ Swal.fire(
            'Done',
            `You have successfully unfollowed ${usernameToUnfollow}`,
            'success'
          ).then(()=> window.location.reload())
        }
          
        } catch (error) {
            error.response && error.response.data.message
  ? Swal.fire(error.response.data.message)
  : Swal.fire(error.message);
            
        }
        
    }




    
    return <div className="sidebar">
        <div className="sidebar-wrapper">
            <ul className="sidebar-list">
                <li onClick={() => history.push("/feed")} className="sidebar-list-item">
                    <RssFeed className="sidebar-icon" />
                    <span className="sidebar-list-item-text">Feed</span>
                </li>
                <li onClick={() => history.push("/chat")} className="sidebar-list-item">
                    <Chat className="sidebar-icon" />
                    <span className="sidebar-list-item-text">Chat</span>
                </li>
                {/* <li className="sidebar-list-item">
                    <PlayCircleFilledOutlined className="sidebar-icon" />
                    <span className="sidebar-list-item-text">Videos</span>
                </li>
                <li className="sidebar-list-item">
                    <Group className="sidebar-icon" />
                    <span className="sidebar-list-item-text">Groups</span>
                </li>
                <li className="sidebar-list-item">
                    <Bookmark className="sidebar-icon" />
                    <span className="sidebar-list-item-text">Bookmarks</span>
                </li>
                <li className="sidebar-list-item">
                    <HelpOutline className="sidebar-icon" />
                    <span className="sidebar-list-item-text">Questions</span>
                </li>
                <li className="sidebar-list-item">
                    <WorkOutline className="sidebar-icon" />
                    <span className="sidebar-list-item-text">Jobs</span>
                </li>
                <li className="sidebar-list-item">
                    <Event className="sidebar-icon" />
                    <span className="sidebar-list-item-text">Events</span>
                </li>
                <li className="sidebar-list-item">
                    <School className="sidebar-icon" />
                    <span className="sidebar-list-item-text">Courses</span>
                </li> */}
               <a href="http://chidestore.herokuapp.com" >
                <li className="sidebar-list-item">
                    <ShoppingCart className="sidebar-icon" />
                    <span className="sidebar-list-item-text">MarketPlace</span>
                </li>
                </a>
            </ul>
            <button className="sidebar-button">See More</button>
            <hr className="sidebar-hr" />
            <ul className="sidebar-friend-list">
                {loading ? <li>Fetching Users ...</li> : error ? <div className="alert m-2 p-2 alert-danger">{error}</div> :
                 users.map(user => {
                    if (user._id !== userId) {
                        return <li key={user._id} className="sidebar-friend">
                            <Link className="flex align-items-center" style={{textDecoration:"none", color: "black"}} to={`/user/${user._id}`}>
                            <img src={user.profilePicture || "/images/profile.png"} alt="" className="sidebar-friend-image" />
                            <span className="sidebar-friend-name">{user.username}</span>
                            </Link>

    {!user.followers.includes(userId)    && <button style={{marginLeft:".5rem"}} onClick={()=>followUser(user._id, user.username)} className="btn-sm btn-outline-green mb-2">Follow </button>}
    { user.followers.includes(userId)    && <button style={{marginLeft:".5rem"}} onClick={()=>unfollowUser(user._id, user.username)} className="btn-sm btn-green mb-2">Unfollow </button>}
                           
                        </li>
                    }

                })}
            </ul>
        </div>

    </div>
}