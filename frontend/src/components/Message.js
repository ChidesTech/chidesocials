import "./Message.css"
import { format } from "timeago.js";
import { MoreVert } from "../../node_modules/@material-ui/icons/index";
export default function Message({ mine, message , friend}) {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const deleteMessage = async()=>{

    }

    return <div className={`message ${mine && "mine"}`}>
        
            {
                mine &&  <ul className="message-top-right-options">
               
                <li onClick={() => deleteMessage(message._id)} >Delete For Me</li>
                <li onClick={() => deleteMessage(message._id)} >Delete For All</li>
            </ul>
            }
        <div className="message-top">
        {
                !mine && <MoreVert className="post-top-right-icon" />

            }
             

            <img src={mine ? userInfo?.profilePicture : friend?.profilePicture} alt="" className="message-image" />
            <p className="message-text">{message.text}</p>
           

            {
                mine && <> <MoreVert className="post-top-right-icon" />
                   </>

            }
      {
          !mine && <ul className="message-top-right-options">
          {/* <li><a className="fa fa-eye btn-info" href=""></a></li>
          <li><a className="fa fa-edit btn-secondary" href=""></a></li> */}
          <li onClick={() => deleteMessage(message._id)}>Delete</li>
          <li onClick={() => deleteMessage(message._id)}>Reply</li>
      </ul>
      }

        </div>
        <div className="message-bottom mt-1 mb-4">
            {format(message.createdAt)}
        </div>
    </div>
}