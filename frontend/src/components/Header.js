import "./Header.css";
import { Search, Chat, Notifications } from "@material-ui/icons";
import {  Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { PeopleTwoTone } from "../../node_modules/@material-ui/icons/index";

export default function Header(props) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const mode = localStorage.getItem("mode") ;


    const [searchInput, setSearchInput] = useState("");
    const history = useHistory()
    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
            return;
        }
    }, [history, userInfo])

    function search(e) {
        e.preventDefault();

        history.push(`/search/${searchInput}`);
    }

    function logOut() {
        Swal.fire("Sign Out Successful", `${userInfo && userInfo.username}, we hope to see you soon`, 'success')

        localStorage.removeItem("userInfo");

    }

    function toggleMode() {
        mode === "d" ? localStorage.setItem("mode", "") : localStorage.setItem("mode", "d");
        window.location.reload();

    }
    return <>
        <div className="header-container">

            <div className="header-left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">EveryNaija</span>
                </Link>
            </div>
            <div className="header-center hidden-medium">
                <form className="search-bar" onSubmit={search}>

                    <a href={`/search/${searchInput}`} >


                        <button type="submit" style={{ border: "none", background: "transparent" }}>


                            <Search className="search-icon" />
                        </button>
                    </a>
                    <input value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}

                        type="text" placeholder="Search for people or posts" className="search-input" />
                </form>
            </div>
            <div className="header-right">
                <div className="header-links">
                    <Link to="/">
                    <span className="header-link text-white">Homepage</span>
                    </Link>
                    <Link to="/profile">

                    <span className="header-link text-white">Timeline</span>
                    </Link>

                </div>
                <div className="header-icons">
                    <Link to ="/users" className="header-icon-item h500">
                    <PeopleTwoTone/>

                        <span className="header-icon-badge">1</span>
                    </Link>
                    <Link className="header-icon-item h500" to="/chat">

                        <Chat />
                        <span className="header-icon-badge">1</span>
                    </Link>
                    <span onClick={toggleMode} className="header-icon-item h500 moon-icon"  >

                        <i style={{ fontSize: "1.2rem" }} className="fa fa-moon"></i>
                    </span>

                    <div className="header-icon-item h500 ">
                        <Notifications />
                        <span className="header-icon-badge">1</span>
                    </div>
                    <Link to="/search" className="header-icon-item h500 h997">
                        <Search />
                    </Link>
                </div>
                <div className="s500">

               

<Link className="header-icon-item  " to="/search">

    <Search/>
</Link>
<Link className="header-icon-item  " to="/chat">

    <Chat />
    <span className="header-icon-badge">1</span>
</Link>

</div>


                <div className="toggle-profile-dropdown h500">

                    <img src={userInfo && (userInfo.profilePicture || "/images/profile.png")} alt="" className="header-image" />
                    <ul className="profile-dropdown">
                        <Link className="profile-dropdown-item" to="/profile">
                            <li ><i className="fa fa-user"></i> Profile</li>
                        </Link>
                        <Link onClick={logOut} className="profile-dropdown-item" to="/login">
                            <li><i className="fa fa-sign-out-alt"></i> Logout</li>
                        </Link>

                    </ul>

                </div>

               


            </div>

        </div>

    </>

}