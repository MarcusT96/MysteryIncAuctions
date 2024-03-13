import SearchBar from "../components/Searchbar"
import Products from "../components/Products"
import '../style/auctionpage.css'
import { useState } from "react"
import EndedAuctions from "../components/EndedAuctions"

export default function Auctionpage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState("asc")
  const [sortCriterion, setSortCriterion] = useState('price')
  const handleSearch = (query) => {
    setSearchQuery(query)}

  const handleChange = (criterion) => {
    setSortCriterion(criterion);}

  const toggleOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  
  

  return <main className="auctionpage">
    <div className="searchdiv">
      <SearchBar onSearch={handleSearch} />
    </div>
    <div className="sortingbuttons">
      <select className="sorting" onChange={(e) => handleChange(e.target.value)} value={sortCriterion}>
        <option value="price">Pris</option>
        <option value="time">Tid kvar</option>
        <option value="name">Namn</option>
      </select>
      <button className="sorting" onClick={toggleOrder}>{sortOrder === "asc" ? "Sortera sjunkande" : "Sortera ökande"}</button>
      </div>
    <div className="auction-container">
      <h2 className="Headline">Aktiva Auctioner</h2>
      <Products searchQuery={searchQuery} sortOrder={sortOrder} sortCriterion={sortCriterion} />
    </div>
    <div className="auction-container">
      <h2 className="Headline">Avslutade auktioner</h2>
      <EndedAuctions/>
    </div>
  </main>
}