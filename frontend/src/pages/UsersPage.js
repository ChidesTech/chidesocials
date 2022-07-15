
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import "./UsersPage.css";
import Bottombar from "../components/Bottombar";
import Footer from "../components/Footer";
export default function Userspage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [userFollowers, setUserFollowers] = useState([]);


    const history = useHistory();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
        var userId = userInfo._id;
    }

    async function getUsers() {
        try {
            setLoading(true);
            const { data } = await axios.get("http://localhost:5000/api/users");
            setUsers(data.user);
            setLoading(false);


        } catch (error) {

        }

    }
    useEffect(() => {
        !userInfo && history.push("/login")

        getUsers();
        if (users.length > 0) {
            setLoading(false);
        }

        // getUserFollowers(userId)

    }, [users.length, history, userId, userInfo]);





    // async function getUserFollowers(userToFollow) {
    //     try {
    //         const { data } = await axios.get(`http://localhost:5000/api/users/${userToFollow}/followers`)
   
    //         // setUserFollowers(data);

    //     } catch (error) {
    //         error.response && error.response.data.message
    //             ? console.log(error.response.data.message)
    //             : console.log(error.message);

    //     }

    // }

    async function followUser(userToFollow, usernameToFollow) {
        try {
            axios.put(`http://localhost:5000/api/users/${userToFollow}/follow`, { userId })
            Swal.fire(
                'Done',
                `You have successfully followed ${usernameToFollow}`,
                'success'
            )
                .then(() => window.location.reload())

        } catch (error) {
            error.response && error.response.data.message
                ? console.log(error.response.data.message)
                : console.log(error.message);

        }

    }
    async function unfollowUser(userToUnfollow, usernameToUnfollow) {
        try {
            axios.put(`http://localhost:5000/api/users/${userToUnfollow}/unfollow`, { userId })
            Swal.fire(
                'Done',
                `You have successfully unfollowed ${usernameToUnfollow}`,
                'success'
            )
                .then(() => window.location.reload())
        } catch (error) {
            error.response && error.response.data.message
                ? console.log(error.response.data.message)
                : console.log(error.message);

        }

    }





    return <>
        <Header />
        <main>
        <div className="home-container" style={{marginTop: "3rem"}}>
            <Sidebar />
            
                <div className="sidebar-wrapper users-page">

                    <div>Users</div>
                    <hr/>
                    <ul className="sidebar-friend-list">
                        {loading ? <li>Fetching Users ...</li> : users.map(user => {
                            if (user._id !== userId) {
                                return <li key={user._id} className="sidebar-friend">
                                    <Link style={{ textDecoration: "none", color: "black" }} to={`/user/${user._id}`}>
                                        <img src={user.profilePicture || "/images/profile.png"} alt="" className="sidebar-friend-image" />
                                        <span className="sidebar-friend-name">{user.username}</span>
                                    </Link>
                                 <div>
                                    {!user.followers.includes(userId) && <button style={{ marginLeft: ".5rem" }} onClick={() => followUser(user._id, user.username)} className="btn-sm btn-outline-green mb-2">Follow </button>}
                                    {user.followers.includes(userId) && <button style={{ marginLeft: ".5rem" }} onClick={() => unfollowUser(user._id, user.username)} className="btn-sm btn-green mb-2">Unfollow </button>}
                                    <Link  className="btn-sm btn-green ms-2 pt-2 pb-2 ps-3 pe-3" to={`/chat-user/${user._id}`}> 
                                    <i className="fas fa-comment-dots"></i>
                                     </Link>
                                    </div>
                                </li>
                            }

                        })}
                    </ul>
                </div>

            
    
    {<Rightbar  page="home" />}

    
        </div>
        
</main>
        <Footer/>
<Bottombar/>

    </>
}