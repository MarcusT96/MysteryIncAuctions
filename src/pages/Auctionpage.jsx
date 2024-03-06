import SearchBar from "../components/Searchbar";
import Products from "../components/Products";
import '../style/auctionpage.css'
import { useState } from "react";

export default function Auctionpage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriterion, setSortCriterion] = useState('price');
  const handleSearch = (query) => {
    setSearchQuery(query)}

  const handleSortCriterionChange = (criterion) => {
    setSortCriterion(criterion);}

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  
  

  return <main className="auctionpage">
    <div className="searchdiv">
      <SearchBar onSearch={handleSearch} />
    </div>
    <div className="sortingbuttons">
      <select className="sorting" onChange={(e) => handleSortCriterionChange(e.target.value)} value={sortCriterion}>
        <option value="price">Pris</option>
        <option value="time">Tid kvar</option>
        <option value="name">Namn</option>
      </select>
      <button className="sorting" onClick={toggleSortOrder}>{sortOrder === "asc" ? "Sortera sjunkande" : "Sortera ökande"}</button>
      </div>
    <div className="auction-container">
      <Products searchQuery={searchQuery} sortOrder={sortOrder} sortCriterion={sortCriterion} />
    </div>
  </main>
}