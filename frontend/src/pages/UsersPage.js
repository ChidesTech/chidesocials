import { useEffect, useState } from "react";
import http from "../http-common";
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
    const [error, setError] = useState("");

    // const [userFollowers, setUserFollowers] = useState([]);


    const history = useHistory();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
        var userId = userInfo._id;
    }

    async function getUsers() {
        try {
            setLoading(true);
            const { data } = await http.get("/users", {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setUsers(data.user);
            if (data.user) {
                setLoading(false);
            }


        } catch (error) {
            setLoading(false);

            error.response && error.response.data.message
                ? setError(error.response.data.message)
                : setError(error.message);
        }

    }
    useEffect(() => {
        !userInfo && history.push("/login")

        getUsers();
        if (users.length > 0) {
            setLoading(false);
        }

        // getUserFollowers(userId)

    }, []);





   

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





    return <>
        <Header />
        <main>
            <div className="home-container" style={{ marginTop: "3rem" }}>
                <Sidebar />

                <div className="sidebar-wrapper users-page">

                    <div>Users</div>
                    <hr />
                    <ul className="sidebar-friend-list">
                        {loading ? <li>Fetching Users ...</li> :
                        error ? <div className="alert alert-danger p-2 m-2 ">{error}</div> :(

                            users.length === 0 ? <div className="alert alert-danger p-2 ">No User Found</div> :
                            users.map(user => {
                                    if (user._id !== userId) {
                                        return <li key={user._id} className="sidebar-friend mt-3">
                                            <Link className="flex" style={{ textDecoration: "none", color: "black" }} to={`/user/${user._id}`}>
                                                <img src={user.profilePicture || "/images/profile.png"} alt="" className="sidebar-friend-image" />
                                                <span className="sidebar-friend-name">{user.username}</span>
                                            </Link>
                                            <div>
                                                {!user.followers.includes(userId) && <button style={{ marginLeft: ".5rem" }} onClick={() => followUser(user._id, user.username)} className="btn-sm btn-outline-green mb-2">Follow </button>}
                                                {user.followers.includes(userId) && <button style={{ marginLeft: ".5rem" }} onClick={() => unfollowUser(user._id, user.username)} className="btn-sm btn-green mb-2">Unfollow </button>}
                                                <Link className="btn-sm btn-green ms-2 pt-2 pb-2 ps-3 pe-3" to={{ pathname:'/chat', state:{ id: user._id } }}>
                                                    <i className="fas fa-comment-dots"></i>
                                                </Link>
                                            </div>
                                        </li>
                                    }
    
                                })
                        )
                        
                            
                            
                            }
                    </ul>
                </div>



                {<Rightbar page="home" />}


            </div>

        </main>
        {/* <Footer /> */}
        <Bottombar />

    </>
}
