import "./HomePage.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { useEffect, useContext } from "react";
import Bottombar from "../components/Bottombar";
import Footer from "../components/Footer";
import { PostContext } from "../context/PostContext";

export default function HomePage(props){
   const postSuccess = useContext(PostContext);


   useEffect(() =>{
   let userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if(!userInfo) 
      {props.history.push("/login");
      return;}
   },[props.history])
   return (<>
   <Header />

   <main style={{margin : 0, padding : 0}}>

  
   <div className="home-container" style={{marginTop: "3rem"}}>
   <Sidebar />
   {postSuccess}
   <Feed  page="home"/>
   {<Rightbar page = "home"/>}

   </div>
   </main>
   {/* <Footer></Footer> */}

   <Bottombar/>
   </>
      
      
      )
}