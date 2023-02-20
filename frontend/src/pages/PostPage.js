import { useEffect, useState } from "react";
import http from "../http-common";
import Bottombar from "../components/Bottombar";
import Feed from "../components/Feed";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Post from "../components/Post";
import Comment from "../components/Comment";
import Rightbar from "../components/Rightbar";
import Share from "../components/Share";
import Sidebar from "../components/Sidebar";
import "./PostPage.css";
import Swal from "sweetalert2";

export default function PostPage(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const user = userInfo._id;
    const [post, setPost] = useState("");
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    async function getPost(){
        // setLoading(true)
        try {
           

            const { data } = await http.get(`/posts/${props.match.params.id}`,  {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            });
            setPost(data.post);
            setComments(data.comments);
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

    async function submitHandler(e){
        e.preventDefault();
        if(!text){
            Swal.fire("Empty Field", "Please Type In Your Comment", "error");
            return;
        }
        try {
            const {data} = await http.put(`/posts/${props.match.params.id}/comments`,
             {text , user, post : props.match.params.id  },
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            }
            );
            if(data.success){
                setText("");
                getPost();
            }
        } catch (error) {
            error.response && error.response.data.message
            ? Swal.fire("Error", error.response.data.message, "error")
            : Swal.fire("Error", error.message , "error");
        }
       
    }
    useEffect(() =>{       
        getPost();
    }, [])
    return <>
    <Header />
 
    <main>
 
   
    <div className="home-container" style={{marginTop: "3rem"}}>
    <Sidebar />
    <div className="feed">
        <div className="feed-wrapper">

    <Share />

   {loading ? <div className="m-2">Loading ...</div> : post ? <> <Post _id={post._id} postUserId={post.user._id} key={post._id} image={post.image} desc={post.desc}
   username={post.user.username} profilePicture={post.user.profilePicture}
   likes={post.likes.length} likers={post.likes} dislikes={post.dislikes.length}
   dislikers={post.dislikes} createdAt={post.createdAt} comments={comments.length}
/>
    <form onSubmit={submitHandler} action="" className="add-comment-form">
    <textarea value={text} onChange={e => setText(e.target.value)} className="add-comment-field p-2" name="" id=""  rows="1" placeholder="Enter Comment"></textarea>
  <button type="submit" className="add-comment-btn btn p-2 btn-success">
   <i className="fa fa-paper-plane"></i>
</button>
    </form>
 <div className="ps-3 pe-3">
    <h6 >COMMENTS</h6>
    {
        comments.map(comment =>{
            return  <Comment _id={comment._id} commentUserId={comment.user._id} key={comment._id} image={post.image} text={comment.text}
            username={comment.user.username} profilePicture={comment.user.profilePicture}
            likes={post.likes.length} likers={post.likes} dislikes={post.dislikes.length}
            dislikers={post.dislikes} createdAt={comment.createdAt}
         />
        })
}
   
    
   
   
 </div>


</> : <div className="alert alert-success p-2 m-2">No Post Found</div>
} 

    </div>
    </div>

    {<Rightbar page = "home"/>}
 
    </div>
    </main>
    <Footer></Footer>
 
    <Bottombar/>
    </>
}