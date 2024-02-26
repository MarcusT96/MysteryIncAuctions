import SearchBar from "../components/Searchbar";
import Products from "../components/Products";
import '../style/auctionpage.css'


export default function Auctionpage(){
  

  return <main className="auctionpage">
    <SearchBar />
    <Products />
  </main>
}