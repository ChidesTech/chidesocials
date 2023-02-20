import Share from "./Share";
import Post from "./Post";
import Comment from "./Comment";
import "./Feed.css";
import { useEffect, useState } from "react";
import http from "../http-common";
import { Link, useHistory } from "react-router-dom";
import Popup from "./Popup";



export default function Feed(props) {


    const [peoplePost, setPeoplePost] = useState("post");
    const [error, setError] = useState("");

    let page = props.page;
    if (props.viewUser) {
        var viewUser = props.viewUser;

    }


    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    var [user, setUser] = useState("");
    var [loading, setLoading] = useState(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
        var userId = userInfo._id;
    }
    if (props.id) {
        var id = props.id;
    }
    if (props.searchText) {
        var searchText = props.searchText;
    }



    async function getMyPosts(userId) {
        try {
            setLoading(true)

                setLoading(false);
            const { data } = await http.get(`/posts/mine/${userId}`,{
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setPosts(data.posts);
            setUser(data.user);
            if (data.posts) {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);

            error.response && error.response.data.message
                ? setError(error.response.data.message)
                : setError(error.message);


        }

    }
    async function getUserPosts(params) {

        try {
            setLoading(true)

            const { data } = await http.get(`/posts/mine/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setPosts(data.posts);
            if (data) {
                setLoading(false);
            }


        } catch (error) {
            setLoading(false);

            error.response && error.response.data.message
                ? setError(error.response.data.message)
                : setError(error.message);

        }

    }
    async function getAllPosts(userId) {
        try {
            setLoading(true)

            const { data } = await http.get(`/posts/all/${userId}`,  {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setPosts(data.posts);
            if (data.posts) {
                setLoading(false);
            }

        } catch (error) {
            setLoading(false);


            error.response && error.response.data.message
                ? setError(error.response.data.message)
                : setError(error.message);

        }

    }
    async function getSearchPosts(searchText) {

        try {
            setLoading(true)
            const { data } = await http.get(`/search?searchText=${searchText}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            })
            setPosts(data.posts);
            setUsers(data.users)
            if (data.posts) {
                setLoading(false);
            }




        } catch (error) {
            setLoading(false);
            error.response && error.response.data.message
                ? setError(error.response.data.message)
                : setError(error.message);

        }

    }
    async function getFeed() {

        try {
            setLoading(true)
            const { data } = await http.get(`/posts`,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    }
                }
            );
            setPosts(data);

            setLoading(false);
           

        } catch (error) {
            setLoading(false);
            error.response && error.response.data.message
                ? setError(error.response.data.message)
                : setError(error.message);

        }

    }

    const history = useHistory();
    useEffect(() => {


        if (page === "search") {
            getSearchPosts(searchText);
            if (posts.length > 0) {
                setLoading(false);
            }
            //   console.log(result)

            return;
        }

        if (page === "profile") {
            getMyPosts(userId);
            return;
        }
        if (page === "home") {
            getAllPosts(userId);
            if (posts.length > 0) {
                setLoading(false);
            }

            return;
        }
        if (page === "feed") {
            getFeed();


            return;
        }

        if (page === "user-profile") {
            setUser(props.viewUser)
          id &&  getUserPosts(id);


            return;


        }



    }, [userId, page, id, searchText])




    return <div className="feed">
        <div className="feed-wrapper">

            <Share />

            {page === "search" &&
                <div className="people-post">
                    <div onClick={() => setPeoplePost("post")} className={peoplePost === "post" && "people-post-active"}>Posts</div>
                    <div onClick={() => setPeoplePost("people")} className={peoplePost === "people" && "people-post-active"}>People</div>
                </div>
            }

            {
                peoplePost === "post" && (


                   loading ? <div className="m-2">Fetching Posts ...</div> :
                   error ? <div className="alert alert-danger p-2 m-2">{error}</div> : 
                        posts.length === 0 ? <div className="alert p-2 m-1 alert-info">No Post found.</div> :


                            posts.map(post => {
                                return <Post key={post._id}
                                    _id={post._id} postUserId={post.user._id}  image={post.image} desc={post.desc}
                                    username={post.user.username} profilePicture={post.user.profilePicture}
                                    likes={post.likes.length} likers={post.likes} dislikes={post.dislikes.length}
                                    dislikers={post.dislikes} createdAt={post.createdAt} comments={post.numComments}
                                />
                            }))
            }
            {
                peoplePost === "people" && (users.length > 0 ? <ul className="sidebar-friend-list mt-2 ms-2">
                    {users.map(user => {
                        if (user._id !== userId) {
                            return <li key={user._id} className="sidebar-friend">
                                <Link style={{ textDecoration: "none", color: "black" }} to={`/user/${user._id}`}>
                                    <img src={user.profilePicture || "/images/profile.png"} alt="" className="sidebar-friend-image" />
                                    <span className="sidebar-friend-name">{user.username}</span>
                                </Link>

                                {/* {!user.followers.includes(userId)    && <button style={{marginLeft:".5rem"}} onClick={()=>followUser(user._id, user.username)} className="btn-sm btn-outline-green mb-2">Follow </button>} */}
                                {/* { user.followers.includes(userId)    && <button style={{marginLeft:".5rem"}} onClick={()=>unfollowUser(user._id, user.username)} className="btn-sm btn-green mb-2">Unfollow </button>} */}
                                <Link className="btn-sm btn-green ms-2 pt-2 pb-2 ps-3 pe-3" to={`/chat-user/${user._id}`}>
                                    <i className="fas fa-comment-dots"></i>
                                </Link>
                            </li>
                        }

                    })}

                </ul> : <div className="alert alert-info p-2 m-1">No User Found.</div>)
            }



        </div>

    </div>
}