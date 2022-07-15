import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Search } from "../../node_modules/@material-ui/icons/index";
import Bottombar from "../components/Bottombar";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function SearchPage(props) {
    const [searchInput, setSearchInput]  = useState("");
    const history = useHistory();
    function search(e) {

        e.preventDefault();
        history.push(`/search/${searchInput}`);
    }
    return <>
<Header/>

<main>
    
    <form style={{marginTop:"4rem", position:"fixed"}} className="search-bar search-bar-s500"
    onSubmit={search}>
    <a href={`/search/${searchInput}`}>
        <button style={{border:"none", background:"transparent"}} type="submit">

        
    <Search onClick={search} className="search-icon"/>
    </button>
    </a>
<input  value={searchInput} 
onChange={e => setSearchInput(e.target.value)}

type="text" placeholder="Search for people or posts" className="search-input" />

</form>
<Link style={{marginTop:"8rem", position:"fixed"}} to="/" className="btn btn-green ms-2">Cancel</Link>


</main>
<Footer></Footer>

   <Bottombar/>
</>
}