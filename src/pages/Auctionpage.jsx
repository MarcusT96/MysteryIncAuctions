import SearchBar from "../components/Searchbar";
import Products from "../components/Products";
import '../style/auctionpage.css'
import { useState } from "react";

export default function Auctionpage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSearch = (query) => {
    setSearchQuery(query)
  }
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return <main className="auctionpage">
    <div className="searchdiv">
      <SearchBar onSearch={handleSearch} />
    </div>
    <div className="sorting">
      <button onClick={toggleSortOrder}>{sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}</button>
      </div>
    <div className="auction-container">
      <Products searchQuery={searchQuery} sortOrder={sortOrder} />
    </div>
  </main>
}