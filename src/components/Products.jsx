import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Products({ searchQuery }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const response = await fetch('Mysteryboxes.json');
      const data = await response.json();
      setItems(data.mystery_boxes);
    }
    load();
  }, []);

  useEffect(() => {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, items]);

  const navigateToObjectPage = (id) => {
    navigate(`/box/${id}`);
  };

  return (
    <article className="Auction-list">
      {filteredItems.map(item => (
        <section key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <img src={item.image} alt={item.name} />
          <button onClick={() => navigateToObjectPage(item.id)} className="auctionbutton">Köp för {item.price} kr.</button>
        </section>
      ))}
    </article>
  );
}

export default Products;
