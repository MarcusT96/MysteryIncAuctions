import { useState, useEffect } from "react";

function Products({ searchQuery }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

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
    setFilteredItems(filtered);
  }, [searchQuery, items]);

  return (
    <article className="Auction-list">
      {filteredItems.map(item => (
        <section key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <img src={item.image} alt={item.name} />
          <button className="auctionbutton">Köp för {item.price} kr.</button>
        </section>
      ))}
    </article>
  );
}

export default Products;
