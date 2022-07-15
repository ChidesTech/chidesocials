import { Link } from "react-router-dom";
import {  Home, Menu, Notifications, Group, RssFeed } from "../../node_modules/@material-ui/icons/index";
import "./Bottombar.css";


export default function Bottombar(params) {

    const mode = localStorage.getItem("mode");

    function toggleMode() {
        mode === "d" ? localStorage.setItem("mode", "") : localStorage.setItem("mode", "d");
        window.location.reload();

    }

    return <div className={mode === "d" ? "night-mode bottombar" : "bottombar light-mode"} >
        <div className="header-icons">
            <Link to="/" className="header-icon-item s500">
                <Home style={{fontSize:"2rem"}} />

            </Link>
            <Link to="/feed" className="header-icon-item s500">
                <RssFeed style={{fontSize:"2rem"}} />

            </Link>
            <Link to="/users" className="header-icon-item s500">
                <Group style={{fontSize:"2rem"}} />
            </Link>



            <div className="header-icon-item s500">
                <Notifications style={{fontSize:"2rem"}} />
                <span className="header-icon-badge">1</span>
            </div>

            <div onClick={toggleMode} className="header-icon-item s500">
                
            <i style={{ fontSize: "1.6rem" }} className="fa fa-moon"></i>
            </div>

            <Link to="/menu" className="header-icon-item s500">
                <Menu style={{fontSize:"2rem"}}/>
            </Link>
        </div>

    </div>

}