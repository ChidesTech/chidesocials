import { useEffect, useState } from "react";
import { PermMedia } from "../../node_modules/@material-ui/icons/index";
import "./Share.css";
import http from "../http-common";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Compressor from 'compressorjs';


export default function Share(props) {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
        var userId = userInfo._id;
        var user = userId;
    }

    const history = useHistory()

    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");

    const submitPost = async () => {
        if (desc === "" && image === "") {
            Swal.fire("Not Allowed", "Enter a text or choose an image", 'error')
            return;
        }
        await http.post("/posts", { desc, image, user },
        {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        });

        Swal.fire("Done", "Post successfully uploaded", 'success')

            .then(() => window.location.reload())
    }

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
            return;
        }
    }, [history, userInfo]);



    // FILE UPLOAD
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        new Compressor(file, {
            quality: 0.6, // 0.6 can also be used, but its not recommended to go below.
            success: (compressedResult) => {

                uploadImage(compressedResult);
            },
        });
        //  previewFile(file)
    };

    const uploadImage = async (imageToUpload) => {
        setUploading(true)

        const data = new FormData()
        data.append("file", imageToUpload);
        data.append("upload_preset", "chidespencils");
        data.append("cloud_name", "chidestech");
        

        fetch("https://api.cloudinary.com/v1_1/chidestech/image/upload", { method: "post", body: data })
            .then(resp => resp.json())
            .then(data => {
                setImage(data.secure_url)
                console.log(data);
                setUploading(false);
                setUploaded(true);
            }
            ).catch(err => {
                console.log(err);
                setUploading(false);
            });


    }

    return <div className="share">
        <div className="share-wrapper">
            <div className="share-top">
                <img className="share-profile-image" src={userInfo && userInfo.profilePicture} alt="" />
                <textarea onChange={e => setDesc(e.target.value)} value={desc} 
                    placeholder="what's on your mind?" className="share-input" ></textarea>
                {/* <input onChange={e => setDesc(e.target.value)} value={desc} 
                    placeholder="what's on your mind?" type="text" className="share-input" ></input> */}
            </div>
            <hr className="share-hr" />

            <div className="share-bottom">
                <div className="share-options">
  
                    <div className="share-option">
                        <label style={{ cursor: "pointer" }} htmlFor="file-selector">
                            <PermMedia htmlColor="tomato" className="share-icon" />
                            <span className="share-option-text">Photo</span>
                        </label>
                        <input type="file" name="" style={{ display: "none" }} onChange={handleFileInputChange} id="file-selector" />
                        <input readOnly style={{ display: "none" }} type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>




                </div>

                {uploading && 
                <button onClick={submitPost} disabled className="share-button btn btn-success">Share</button>
            }
                {!uploading && <button onClick={submitPost} className="share-button btn btn-success">Share</button>}
    </div>
    {uploading &&  <div style={{letterSpacing: "2px", fontWeight:"100", fontSize:"1rem"}}>uploading . . .</div> } 
    {uploaded &&  <div className="alert alert-success p-1 m-1 mb-4">Uploaded</div> } 
        </div>

    </div>
}