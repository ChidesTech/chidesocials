import "./HomePage.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { useEffect } from "react";
import Bottombar from "../components/Bottombar";
import Footer from "../components/Footer";
export default function FeedPage(props){

   useEffect(() =>{
   let userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if(!userInfo) 
      {props.history.push("/login");
      return;}
   },[props.history])
   return (<>
   <Header />

   <main>

  
   <div className="home-container" style={{marginTop: "3rem"}}>
   <Sidebar />
   <Feed  page="feed"/>
   {<Rightbar page = "home"/>}

   </div>
   </main>
   <Footer></Footer>

   <Bottombar/>
   </>
      
      
      )
}