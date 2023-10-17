import { useEffect, useState } from "react";
import http from "../http-common";
import {  useHistory } from "react-router-dom";
import LoginRegister from "../components/LoginRegister";
import Swal from "sweetalert2";

import validator from "validator";

export default function RegisterPage() {
 

  const [email , setEmail] = useState("");
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const [confirmPassword , setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [error , setError] = useState("");
  const history = useHistory();

  async function submitHandler(e) {
    e.preventDefault();
   
    if(!email || !password || !username){
      setError("All fields are required");
      return;
    }

    if(!validator.isEmail(email)){
      setError("Email is invalid");
      return;
    }
    if(!validator.isAlphanumeric(username)){
      setError("Username should contain only alphabets and numbers");
      return;
    }

    if(password.length < 6){
      setError("Passwords must be at least 6 characters long");
      return;
    }
    if(password !== confirmPassword){
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
    await http.post("/users/register", {email, username, password})
   
    Swal.fire("Registration Successful",`${username}, visit your email to confirm your account`, '', 'success')
    
   .then(() => history.push("/login")) 
   setLoading(false);
    } catch (error) {

      error.response && error.response.data.message
      ? setError(error.response.data.message)
      : setError(error.message)
    setLoading(false);

      
    }
  }
  let userInfo = JSON.parse(localStorage.getItem('userInfo'));


  useEffect(()=>{
    userInfo && history.push("/");
},[history, userInfo])
    
  return <>
   <LoginRegister page="register"/>

    <form className="main-form"  onSubmit={submitHandler}>
        <h3>Register</h3>
        {error && <div className="alert alert-danger">{error}</div> }
    <div className="mb-3 ">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input required  value= {email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" />
    </div>
    <div className="mb-3 ">
      <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
      <input required  value= {username} onChange={e => setUsername(e.target.value)} type="text" className="form-control" />
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input required  value= {password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label"> Confirm Password</label>
      <input required value= {confirmPassword} onChange={e => setConfirmPassword(e.target.value)}  type="password" className="form-control" id="exampleInputPassword1"/>
    </div>
    <div className="mb-3 form-check">
      <input  type="checkbox" className="form-check-input" id="exampleCheck1"/>
      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" className="btn btn-green w-100 mb-2">Register</button>
  </form>
  </>
}