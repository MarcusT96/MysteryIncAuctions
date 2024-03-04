import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BidPopUp from "../components/BidPopUp.jsx"

export default function ObjectPage() {
  const [box, setBox] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function load() {
      const response = await fetch('/Mysteryboxes.json');
      const data = await response.json();
      const foundBox = data.mystery_boxes.find(box => box.id === parseInt(id, 10));
      setBox(foundBox);
    }
    load();
  }, [id]);

  const handleBidConfirm = (bidAmount) => {
    console.log("Bid confirmed: ", bidAmount);
    // Addera logik för att hantera bud bekräftelse
    // Skicka data till backend och databas.
    setIsModalVisible(false);
  };

  if (!box) return <div>Loading...</div>;


  return (
    <div className="objectpage-container">

      <div className="left--cointainer">
        <img className="box--img" src={box.image} alt="" />
        <p className="time--left--left">Tid kvar av autkion: <b className="time--left">2h 40min 29s</b> </p>
      </div>

      <div className="right--container">
        <h3 className="box--title">{box.name}</h3>
        <p className="product--description">{box.description}</p>
        <p className="highest--bid">Nuvarande högsta bud: <b>{box.price} </b> SEK </p>
        <button className="bid--button" onClick={() => setIsModalVisible(true)}>Lägg bud</button>
        {isModalVisible && (
          <BidPopUp
            onClose={() => setIsModalVisible(false)}
            onConfirm={handleBidConfirm}
          />
        )}
      </div>

    </div>
  )
}
