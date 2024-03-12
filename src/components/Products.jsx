import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "./CountDownTimer.jsx";

function Products({ searchQuery, sortOrder, sortCriterion }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState({});
  const navigate = useNavigate();

  // Funktion för att korta ner varje box beskrivning på auctionpage men behåller full längd på objectpage
  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  useEffect(() => {
    async function load() {
      const response = await fetch(`http://localhost:3000/mystery_boxes`)
      const data = await response.json();
      setItems(data);

      const categoriesResponse = await fetch(`http://localhost:3000/categories`);
      const categoriesData = await categoriesResponse.json();
      const categoriesMap = categoriesData.reduce((acc, category) => {
        acc[category.id] = category.categoryName; // Map id to categoryName
        return acc;
      }, {});
      setCategories(categoriesMap);
    }
    load();
  }, []);

  useEffect(() => {
    const now = new Date() // skapar en current time variabel
    const filtered = items.map(item => ({
      ...item,
      categoryName: categories[item.category], // Adderar kategorinamn till varje box
    })).filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) // searchquery till lowercase som filtrerar det du skriver i searchbaren
    );

    const sortedItems = [...filtered].sort((a, b) => { // Sorteringsfunktion
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
  }, [searchQuery, items, sortOrder, sortCriterion, categories]); // mina useffect värden, när dessa värden ändras så renderar den om



  const navigateToObjectPage = (id) => {
    navigate(`/box/${id}`); // Navigation till objectpage
  };

  return ( // Hela auctions kortet renderas här, den kör så många den kan baserat på hur många idn där finns 
    <article className="Auction-list">
      {filteredItems.map(item => (
        <section key={item.id} className="auction-card">
          <img src={item.image} alt={item.name} />
          <h3 className="auction-title">{item.name}</h3>
          <p className="category-name">Kategori: {item.categoryName}</p>          
          <p> Tid kvar: <h2 className="tidtag">{<CountdownTimer endTime={item.time} />}</h2>  </p>
          <p>Nuvarande högsta bud: <h2 className="pristag">{item.price}kr</h2></p>
          <button onClick={() => navigateToObjectPage(item.id)} className="auctionbutton">Läs mer</button>
        </section>
      ))}
    </article>
  );
}

export default Products;
