import { Link } from "react-router-dom";

export default function LoginRegister(props) {
    let page = props.page;
   
    
    return <div className="login-register">
        <Link to="/login"  className={`login ${page==="login" ? "orange" : "orange-outline"}`}>Login</Link> 
        <Link to="/register" className={`register ${page==="register" ? "orange" : "orange-outline"}`}>Register</Link>
    </div>
}