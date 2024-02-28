import SearchBar from "../components/Searchbar";
import Products from "../components/Products";
import '../style/auctionpage.css'
import { useState } from "react";

export default function Auctionpage() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  return <main className="auctionpage">
    <div className="searchdiv">
      <SearchBar onSearch={handleSearch} />
    </div>
    <div className="auction-container">
      <Products searchQuery={searchQuery} />
    </div>
  </main>
}