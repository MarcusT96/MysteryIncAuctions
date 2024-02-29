import { useState, useEffect } from "react";

function Products({ searchQuery }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  

  useEffect(() => {
    async function load() {
      const response = await fetch('Mysteryboxes.json');
      const data = await response.json();
      setItems(data.mystery_boxes);
    }
    load();
  }, []);

  useEffect(() => {
    // Filter items based on search query
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedItems = [...filtered].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price; // Sort by price in ascending order
      } else {
        return b.price - a.price; // Sort by price in descending order
      }
    });

    setFilteredItems(sortedItems);
  }, [searchQuery, items, sortOrder]);


  
  return (
    <article className="Auction-list">
      {filteredItems.map(item => (
        <section key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <img src={item.image} alt={item.name} />
          <p>{item.time} Dagar kvar</p>
          <button className="auctionbutton">Köp för {item.price} kr.</button>
        </section>
      ))}
    </article>
  );
}

export default Products;
