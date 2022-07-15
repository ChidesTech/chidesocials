import "./HomePage.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Bottombar from "../components/Bottombar";
export default function ResultPage(props){

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
   <Feed  page="search"  searchText ={props.match.params.searchText}/>
   {<Rightbar page = "home"/>}

   </div>
   </main>
<Footer/>
<Bottombar/>



   </>
      
      
      )
}