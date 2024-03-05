import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BidPopUp from "../components/BidPopUp.jsx"

export default function ObjectPage() {
  const [box, setBox] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function load() {
      const response = await fetch(`http://localhost:3000/mystery_boxes/${id}`);
      const box = await response.json();
      setBox(box);
    }
    load();
  }, [id]);

  const handleBidConfirm = async (bidAmount) => {
    if (box && bidAmount > box.price) {
      try {
        const response = await fetch(`http://localhost:3000/mystery_boxes/${box.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ price: bidAmount }),
        });

        if (!response.ok) throw new Error('Network response was not ok.');

        const updatedBox = await response.json();
        setBox(updatedBox);
        alert("Bud bekräftat! Nytt högsta bud: " + bidAmount + " SEK");
        setIsModalVisible(false);
      } catch (error) {
        console.error('Failed to update the bid:', error);
        alert("Ett fel inträffade när budet skulle uppdateras.");
      }
    } else {
      alert("Budet måste vara högre än nuvarande högsta bud.");
    }
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
            box={box}
            onClose={() => setIsModalVisible(false)}
            onConfirm={handleBidConfirm}
          />
        )}
      </div>

    </div>
  )
}
