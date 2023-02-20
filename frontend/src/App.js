import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import UserProfilePage from "./pages/UserProfilePage";
import MyProfilePage from "./pages/MyProfilePage";
import ChatPage from "./pages/ChatPage";
import ChatOnePage from "./pages/ChatOnePage";
import ResultPage from "./pages/ResultPage";
import SearchPage from "./pages/SearchPage";
import UsersPage from "./pages/UsersPage";
import MenuPage from "./pages/MenuPage";
import PostPage from "./pages/PostPage";
import FeedPage from "./pages/FeedPage";
import EditMyProfilePage from "./pages/EditMyProfilePage";
import {useEffect} from "react";
function App() {

  useEffect(()=>{
  window.process = {
    ...window.process,
  }
  },[])

  return (<BrowserRouter>
     
    <Route path="/" exact component={HomePage} 
     />
    <Route path="/edit-profile" component={EditMyProfilePage}   />
    <Route path="/profile" component={MyPage}   />
    <Route path="/my-profile" component={MyProfilePage}   />
    <Route path="/user/:id" component={UserPage}   />
    <Route path="/user-profile/:id" component={UserProfilePage}   />
    <Route path="/register" component={RegisterPage}   />
    <Route path="/login" component={LoginPage}   />
    <Route path="/chat" component={ChatPage}   />
    <Route path="/chat-user/:id" component={ChatOnePage}   />
    <Route exact path="/search" component={SearchPage}   />
    <Route exact path="/search/:searchText" component={ResultPage}   />
    <Route exact path="/users" component={UsersPage}   />
    <Route exact path="/menu" component={MenuPage}   />
    <Route exact path="/post/:id" component={PostPage}   />
    <Route exact path="/feed" component={FeedPage}   />
   </BrowserRouter>
  )
}


export default App;