import { MoreVert } from "../../node_modules/@material-ui/icons/index";
import "./Post.css";
import http from "../http-common";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {format} from "timeago.js";
import { useState } from "react";
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})

export default function Post({ _id, image, desc, username, postUserId, profilePicture,
    likes, dislikes, likers, dislikers, createdAt, comments }) {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
        var userId = userInfo._id
    }
    const [isLiked, setIsLiked] = useState(likers.includes(userId));
    const [isDisliked, setIsDisliked] = useState(dislikers.includes(userId));
    const [postLikes , setPostLikes] = useState(likes);
    const [postDislikes , setPostDislikes] = useState(dislikes);
    const [showMore, setShowMore] = useState(false);

    async function deletePost(id) {
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await http.delete(`/posts/${userInfo._id}/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`,
                        }
                    }
                    )
                    if (data.success) {
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Post deleted successfully.',
                            'success'
                        ).then(() => window.location.reload()
                        )
                    }
                } catch (error) {
                    error.response && error.response.data.message
                ? Swal.fire("Error", error.response.data.message, "error")
                : Swal.fire("Error",error.message, "error");
                }





            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Post Not Deleted',
                    'error'
                )
            }
        })




    }


    async function thumbsUp(id, userId) {
        try {
             await http.put(`/posts/${id}/like`, { userId } ,
             {
                 headers: {
                     Authorization: `Bearer ${userInfo.token}`,
                 }
             })
           .then(()=> {
               setIsLiked(!isLiked);
               setPostLikes(isLiked ? postLikes - 1 : postLikes + 1)
            })
        } catch (error) {
            error.response && error.response.data.message
            ? Swal.fire("Error", error.response.data.message, "error")
            : Swal.fire("Error",error.message, "error");
        }
    }
    async function thumbsDown(id, userId) {
        try {
             await http.put(`/posts/${id}/dislike`, { userId },
             {
                 headers: {
                     Authorization: `Bearer ${userInfo.token}`,
                 }
             })
           .then(() => {
               setIsDisliked(!isDisliked);
               setPostDislikes(isDisliked ? postDislikes - 1 : postDislikes + 1)

            });

        } catch (error) {
            error.response && error.response.data.message
            ? Swal.fire("Error", error.response.data.message, "error")
            : Swal.fire("Error",error.message, "error");
        }
    }

   
    return <>
        <div className="post">

            <div className="post-wrapper">

                <div className="post-top">
                    <div className="post-top-left">
                        <Link style={{ textDecoration: "none" }}
                        
                         to={`/user/${postUserId.toString()}`}
                         >
                            <img src={profilePicture} alt="" className="post-profile-image" />
                            <span className="rightbar-online"></span>

                            <span className="post-username">{username}</span>
                        </Link>
                        <span className="post-date">{format(createdAt)}</span>
                    </div>
                    <div className="post-top-right">

                        {
                            (userInfo._id.toString() === postUserId.toString()) && <ul className="post-top-right-options">
                                <li><Link className="fa fa-eye btn-info" to={`/post/${_id}`}></Link></li>
                                <li><Link className="fa fa-edit btn-secondary" to={`/edit-post/${_id}`}></Link></li>
                                <li onClick={() => deletePost(_id)}><div className="fa fa-trash-alt btn-danger" ></div></li>
                            </ul>

                        }


                        <MoreVert className="post-top-right-icon" />

                    </div>
                </div>
                <div className="post-center">
                      {desc.length > 700 ?(
                       
       <span style={{cursor:"pointer"}} className="post-desc" onClick ={() =>setShowMore(!showMore)}>
        {showMore ?   `${desc} ...See Less`:  `${desc.substr(0,700)} ...See More`}
                 </span>

                      )   
                      : <span className="post-desc">{desc}</span>}
                    <img src={image} alt="" className="post-image" />

                </div>
                <div className="post-bottom">
                    <div className="post-bottom-left">
                        {/* <img className="like-icon" src="/images/like.png" alt="" />
                        <img className="love-icon" src="/images/love.png" alt="" /> */}
                        <span onClick={() => thumbsUp(_id, userInfo._id)} className={isLiked ?
                            "fa fa-thumbs-up up-active" : "fa fa-thumbs-up"}
                        >{postLikes}</span>
                        <span onClick={() => thumbsDown(_id, userInfo._id)}
                            className={isDisliked ? "fa fa-thumbs-down down-active" : "fa fa-thumbs-down"}>{postDislikes}</span>
                        <span className="post-like-counter">{postLikes + postDislikes}
                            {postLikes + postDislikes > 1 ? " reactions" : " reaction"}

                        </span>

                    </div>
                    <div className="post-bottom-right">
                        <span className="post-comment-text">{comments > 1 ? `${comments} comments` :
                        `${comments} comment` } </span>
                    </div>
                </div>
                <Link to={`/post/${_id}`}>
                
                <div className="add-comment"><i className="fa fa-comments"></i> Add Comment</div>
                </Link>

            </div>

        </div>


        
    </>
}