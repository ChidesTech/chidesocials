import { RssFeed,Chat } from "@material-ui/icons";
import { Bookmark,  Event, ExitToAppTwoTone, Group, HelpOutline, Person, PlayCircleFilledOutlined, School, ShoppingBasket, ShoppingCart, WorkOutline } from "../../node_modules/@material-ui/icons/index";
// import "./Sidebar.css";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";
import Bottombar from "../components/Bottombar";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
export default function Menubar() {
    

    const history = useHistory();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   
   
    
    function logOut() {
        localStorage.removeItem("userInfo");

        Swal.fire("Sign Out Successful", `${userInfo && userInfo.username}, we hope to see you soon`, 'success')

        .then(() => history.push("/login"));

    }
   
    const mode = localStorage.getItem("mode");

    function toggleMode() {
        mode === "d" ? localStorage.setItem("mode", "") : localStorage.setItem("mode", "d");
        window.location.reload();

    }
    
  function goToProfile() {
      history.push("/profile");
  }
  function goToChat() {
      history.push("/chat");
  }
  function goToFeed() {
      history.push("/feed");
  }


    
    return <div >
        <Header/>
        <main>
        <div className="home-container" style={{marginTop : "3rem"}}>
            <Sidebar/>
        <div className="sidebar-wrapper menu-page">
            <ul className="sidebar-list">
                <li onClick={goToProfile} className="sidebar-list-item">
                    <Person className="sidebar-icon" />
                    <span className="sidebar-list-item-text">{userInfo && userInfo.username}</span>
                </li>
                <li onClick={goToFeed} className="sidebar-list-item">
                    <RssFeed className="sidebar-icon" />
                    <span className="sidebar-list-item-text">Feed</span>
                </li>
                <li onClick={goToChat} className="sidebar-list-item">
                    <Chat className="sidebar-icon" />
                    <span className="sidebar-list-item-text">Chat</span>
                </li>
                <li className="sidebar-list-item">
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
                </li>
                <li className="sidebar-list-item">
                    <ShoppingCart className="sidebar-icon" />
                    <span className="sidebar-list-item-text">MarketPlace</span>
                </li>
                <li style={{cursor: "pointer"}} className="sidebar-list-item" onClick={toggleMode}>
                    <i className="sidebar-icon fa fa-moon ms-1" />
                    <span className="sidebar-list-item-text">Dark Mode</span>
                </li>
                <li style={{cursor: "pointer"}} className="sidebar-list-item" onClick={logOut}>
                    <ExitToAppTwoTone 
     className="sidebar-icon" />
                    <span className="sidebar-list-item-text">Logout</span>
                </li>
            </ul>
           
            
        </div>

        <Rightbar page="home"/>
        </div>
        </main>
        <Footer/>
       <Bottombar/>
    </div>
}