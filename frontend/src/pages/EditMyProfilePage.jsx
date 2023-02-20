import "./MyPage.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { useEffect, useState } from "react";
import http from "../http-common";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Bottombar from "../components/Bottombar";
import Compressor from "compressorjs";
import validator from "validator";
import Swal from "sweetalert2";
export default function EditMyProfilePage(props) {
    const [user, setUser] = useState({});
    const [profilePicture, setProfilePicture] = useState("");
    const [coverPicture, setCoverPicture] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); 
    const [uploadingProfilePicture, setUploadingProfilePicture] = useState(false); 
    const [uploadingCoverPicture, setUploadingCoverPicture] = useState(false); 
    const [uploadedProfilePicture, setUploadedProfilePicture] = useState(false); 
    const [uploadedCoverPicture, setUploadedCoverPicture] = useState(false); 
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if(userInfo){var userId = userInfo._id};
    async function getUser() {
      
        try {
            const {data} = await http.get(`/users/${userId}`,{
              headers: {
                  Authorization: `Bearer ${userInfo.token}`,
              }
          });
            setUser(data.user);
            setUsername(data.user.username);
            setProfilePicture(data.user.profilePicture);
            setCoverPicture(data.user.coverPicture);
            setFollowers(data.followers)
            setFollowings(data.followings)
           
            
        } catch (error) {
          error.response && error.response.data.message
          ? Swal.fire("Error",error.response.data.message, "error")
          : Swal.fire("Error",error.message, "error");
        }
        
    }

     const handleProfilePictureInputChange = (e) => {
        const file = e.target.files[0];
        new Compressor(file, {
            quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
            success: (compressedResult) => {

                uploadImage(compressedResult, "profile-picture");
            },
        });
        //  previewFile(file)
    };
     const handleCoverPictureInputChange = (e) => {
        const file = e.target.files[0];
        new Compressor(file, {
            quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
            success: (compressedResult) => {

                uploadImage(compressedResult, "cover-picture");
            },
        });
        //  previewFile(file)
    };

    const uploadImage = async (imageToUpload, image) => {
      
       image === "profile-picture" && setUploadingProfilePicture(true)
       image === "cover-picture" && setUploadingCoverPicture(true)

        const data = new FormData()
        data.append("file", imageToUpload);
        data.append("upload_preset", "chidespencils");
        data.append("cloud_name", "chidestech");
        

        fetch("https://api.cloudinary.com/v1_1/chidestech/image/upload", { method: "post", body: data })
            .then(resp => resp.json())
            .then(data => {
              if(image === "profile-picture"){
                setProfilePicture(data.secure_url)
              }
              if(image === "cover-picture"){
                setCoverPicture(data.secure_url)
              }
               
                if(data.secure_url){
                  image === "profile-picture" &&  setUploadingProfilePicture(false);
                  image === "cover-picture" &&  setUploadingCoverPicture(false);
                  image === "profile-picture" &&  setUploadedProfilePicture(true);
                  image === "cover-picture" &&  setUploadedCoverPicture(true);
                }
             
               
            }
            ).catch(err => {
                console.log(err);
                image === "profile-picture" &&  setUploadingProfilePicture(false);
              image === "cover-picture" &&  setUploadingCoverPicture(false);
            });


    }

    
    async function submitHandler(e){
      e.preventDefault();
      if(!validator.isAlphanumeric(username)){
        setError("Username must contain alphabets and numerals only");
        return;
      }
      if(password !== "" && password.length < 6){
        setError("Password must be at least 6 characters long");
        return;
      }
      if(password !== "" && password !== confirmPassword){
        setError("Passwords do not match");
        return;
      }
      try {
        const {data} = await http.put(`/users/${userId}`, {username, profilePicture, coverPicture, password},
        {
          headers: {
              Authorization: `Bearer ${userInfo.token}`,
          }
      });
        if(data.success){
         Swal.fire("Done", "User Profile Updated Successfully", "success");
         setPassword("");
         setConfirmPassword("")
         getUser();
        }
        
      } catch (error) {
        error.response && error.response.data.message
        ? setError(error.response.data.message)
        : setError(error.message);
      }
    
    }

    useEffect(()=>{
        if(!userInfo){
      props.history.push("/login");
      return;
        }
        // setUsername(userInfo.username);
    },[props.history])

    
    useEffect(()=>{
      !userInfo && props.history.push("/login")
         getUser();
    },[  ])
    return (<>
        <Header />
        <div className="profile">
            <Sidebar />
            <div className="profile-right">
                <div className="profile-right-top">
                {/* <form action="" className="form popup-form">
      <input type="text" className="form-control"/>
      <input type="text" className="form-control"/>
      <button className="form-control">Submit</button>
  </form> */}
                    <div className="profile-image">
                    <img className="cover-image" src={user.coverPicture || "/images/profile.png"} alt=""/>
                    <img className="display-image" src={user.profilePicture || "/images/profile.png"} alt=""/>
                    </div>
                   
                   <div className="profile-info">
                       <h4 className="profile-info-name">{user.username}</h4>
                       <span className="profile-info-description">Software Engineer</span>
                   </div>
                <Link style={{display:"block"}} to="/profile" className="btn btn-green mb-1"><i className="fa fa-user"></i> Back</Link>
                {/* <Link style={{display:"block"}} to="/profile" className="btn btn-green mb-1"><i className="fa fa-user"></i> View Timeline</Link> */}
                   
                </div>
                <div className="profile-right-bottom">
                    <div className="feed"  style={{minHeight :"100vh"}}>
                    <form className="main-form"  onSubmit={submitHandler}>
        <h3>Edit Profile</h3>
        {error && <div className="alert alert-danger">{error}</div> }

    <div className="mb-1 ">
      {uploadingProfilePicture && <div>Uploading Profile Picture ...</div> }
      {uploadedProfilePicture && <div>Profile Picture Uploaded</div> }
      <label htmlFor="profile-picture" style={{cursor:"pointer"}} className="form-control btn btn-success">Change Profile Picture</label>
      <input  type="file" id="profile-picture" style={{display:"none"}} onChange={handleProfilePictureInputChange} className="form-control " />
      <input  type="text" value={profilePicture}  style={{display:"none"}}  className="form-control " />
    </div>
    <div className="mb-1 ">
    {uploadingCoverPicture && <div>Uploading Cover Picture ...</div> }
    {uploadedCoverPicture && <div>Cover Picture Uploaded</div> }

      <label htmlFor="cover-picture" style={{cursor:"pointer"}} className="form-control btn btn-success">Change Cover Picture</label>
      <input  type="file" id="cover-picture" style={{display:"none"}} onChange={handleCoverPictureInputChange} className="form-control " />
      <input  type="text" value={coverPicture}  style={{display:"none"}} className="form-control " />
    </div>
    <div className="mb-1 ">
      <label  htmlFor="exampleInputEmail1" className="form-label">Edit Username</label>
      <input value={username} onChange={e => setUsername(e.target.value)}  type="text" className="form-control" />
    </div>
    <div className="mb-1 ">
      <label htmlFor="exampleInputEmail1" className="form-label">Edit Current Residence</label>
      <input  type="email" className="form-control" />
    </div>
    <div className="mb-1 ">
      <label htmlFor="exampleInputEmail1" className="form-label">Edit State Of Origin</label>
      <input  type="email" className="form-control" />
    </div>
      <center className="mt-3"><label htmlFor="">Security Settings</label></center>
    <div className="mb-1">
      <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
      <input value= {password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1"  className="form-label">Confirm New Password</label>
      <input value= {confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" className="form-control" />
    </div>
    
   
    <button type="submit" className="btn btn-green w-100 mb-2">Save Changes</button>
  </form>
                    </div>
                    <Rightbar page="profile" user={userInfo} followers={followers} followings={followings}/>
                </div>
            </div>
        </div>
        <Footer/>
        <div>
        <Bottombar/>
        </div>

 

    </>


    )
}