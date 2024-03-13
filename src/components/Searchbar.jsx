import { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query)
    onSearch(query)
  };

  return (
    <input className='auction-search'
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Sök bland våra MysteryBoxar"
    />
  );
};

export default SearchBar
