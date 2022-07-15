import Bottombar from "../components/Bottombar";
import Feed from "../components/Feed";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Rightbar from "../components/Rightbar";
import Sidebar from "../components/Sidebar";

export default function PostPage(params) {
    return <>
    <Header />
 
    <main>
 
   
    <div className="home-container" style={{marginTop: "3rem"}}>
    <Sidebar />
    <Feed  page="home"/>
    {<Rightbar page = "home"/>}
 
    </div>
    </main>
    <Footer></Footer>
 
    <Bottombar/>
    </>
}