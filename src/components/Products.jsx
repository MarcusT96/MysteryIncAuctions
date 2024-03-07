import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "./CountDownTimer.jsx";

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
    const now = new Date()
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedItems = [...filtered].sort((a, b) => {
      if (sortCriterion === 'price') {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      
      } else if (sortCriterion === 'time') {
      
        const endTimeA = new Date(a.time).getTime()
        const endTimeB = new Date(b.time).getTime()

        const timeLeftA = endTimeA - now;
        const timeLeftB = endTimeB - now

        return sortOrder === "asc" ? timeLeftA - timeLeftB : timeLeftB - timeLeftA
     
      } else if (sortCriterion === 'name') {
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
          <p> Tid kvar: {<CountdownTimer endTime={item.time} />}  </p>
          <p>Nuvarande högsta bud: {item.price}kr</p>
          <button onClick={() => navigateToObjectPage(item.id)} className="auctionbutton">Lägg bud!</button>
        </section>
      ))}
    </article>
  );
}

export default Products;
