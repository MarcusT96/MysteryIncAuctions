import { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e) => { //variable som hanterar ändringar i searchbaren
    const query = e.target.value;
    setSearchTerm(query)
    onSearch(query)
  }

  return (
    <input className='auction-search'  //Enkel Searchbar
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Sök bland våra MysteryBoxar"
    />
  )
}

export default SearchBar
