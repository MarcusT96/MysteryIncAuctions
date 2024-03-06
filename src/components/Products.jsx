import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Products({ searchQuery, sortOrder, sortCriterion }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const navigate = useNavigate();
  


  useEffect(() => {
    async function load() {
      const response = await fetch(`http://localhost:3000/mystery_boxes`)
      const data = await response.json();
      setItems(data);
    }
    load();
  }, []);

  useEffect(() => {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedItems = [...filtered].sort((a, b) => {
      if (sortCriterion === 'price') {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortCriterion === 'time') {
        // Assuming time is stored in a comparable format, e.g., days left as integers
        return sortOrder === "asc" ? a.time - b.time : b.time - a.time;
      } else if (sortCriterion === 'name') {
        // Compare names alphabetically
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      return 0; // Default case if no sortCriterion matches
    });

    setFilteredItems(sortedItems);
  }, [searchQuery, items, sortOrder, sortCriterion]);



  const navigateToObjectPage = (id) => {
    navigate(`/box/${id}`);
  };

  return (
    <article className="Auction-list">
      {filteredItems.map(item => (
        <section key={item.id} className="auction-card">
          <h2 className="auction-title">{item.name}</h2>
          <p>{item.description}</p>
          <img src={item.image} alt={item.name} />
          <p>{item.time} Dagar kvar</p>
          <p>Nuvarande bud {item.price}kr</p>
          <button onClick={() => navigateToObjectPage(item.id)} className="auctionbutton">Lägg bud!</button>
        </section>
      ))}
    </article>
  );
}

export default Products;
