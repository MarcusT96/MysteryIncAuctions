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
    const now = new Date() // skapar en current time variabel
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) // searchquery till lowercase som filtrerar det du skriver i searchbaren
    );

    const sortedItems = [...filtered].sort((a, b) => { // Sorterings funktion
      if (sortCriterion === 'price') {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price; // jämför pris a - pris b eller tvärtom
      
      } else if (sortCriterion === 'time') {
      
        const endTimeA = new Date(a.time).getTime() // Här skapar jag endtime till millisekunder för att kunna jämföra dom
        const endTimeB = new Date(b.time).getTime()

        const timeLeftA = endTimeA - now; // Räknar ut hur lång tid det är kvar exakt från nu till sluttiden
        const timeLeftB = endTimeB - now

        return sortOrder === "asc" ? timeLeftA - timeLeftB : timeLeftB - timeLeftA // Returnerar ny ordning i tidsföljd
     
      } else if (sortCriterion === 'name') {
       return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name); //Sorterar ut i alfabetisk ordning, båda riktningar
      }
      return 0; // Default värde om inget matchar
    });

    setFilteredItems(sortedItems); // updaterare state
  }, [searchQuery, items, sortOrder, sortCriterion]); // mina useffect värden, när dessa värden ändras så renderar den om



  const navigateToObjectPage = (id) => {
    navigate(`/box/${id}`); // Navigation till objectpage
  };

  return ( // Hela auctions kortet renderas här, den kör så många den kan baserat på hur många idn där finns 
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
