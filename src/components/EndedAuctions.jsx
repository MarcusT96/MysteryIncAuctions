import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

function EndedAuctions() {
  const [endedItems, setEndedItems] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    async function loadEndedAuctions() {
      const response = await fetch(`http://localhost:3000/mystery_boxes`);
      const data = await response.json();
      const now = new Date();
      const endedAuctions = data.filter(item => {
        const endTime = new Date(item.time).getTime();
        return endTime < now.getTime(); // Filter auctions that have ended
      });
      setEndedItems(endedAuctions);
    }
    loadEndedAuctions();
  }, []);

  const navigateToObjectPage = (id) => {
    navigate(`/box/${id}`); // Navigation till objectpage
  };

  return (
    
    <article className="Auction-list">
      {endedItems.length > 0 ? (
        endedItems.map(item => (
          <section key={item.id} className="auction-card">
            <img src={item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>Avslutningspris: <h2 className="tidtag">{item.price}kr</h2></p>
              <p>Avslutades: {new Date(item.time).toLocaleString('default', {  hour12: false })}</p>
              <button onClick={() => navigateToObjectPage(item.id)} className="auctionbutton">Läs mer</button>
            </div>
          </section>
        ))
      ) : (
        <p>Inga avslutade auctioner tillgängliga.</p>
      )}
    </article>
  );
}

export default EndedAuctions;