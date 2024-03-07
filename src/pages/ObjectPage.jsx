import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BidPopUp from "../components/BidPopUp.jsx"
import { toast } from 'react-toastify';
import CountdownTimer from '../components/CountDownTimer.jsx';
import { handleBidConfirm } from '../utils/bidHandling.js';


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

  const confirmBid = (bidAmount) => {
    handleBidConfirm(box, bidAmount, setBox, setIsModalVisible, toast);
  };
    

  if (!box) return <div>Loading...</div>;


  return (
    <div className="objectpage-container">

      <div className="left--cointainer">
        <img className="box--img" src={box.image} alt="" />
        <p className="time--left--left"> Tid kvar av auktion: <b className="time--left">{<CountdownTimer endTime={box.time} />}</b></p>
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
            onConfirm={confirmBid}
          />
        )}
      </div>

    </div>
  )
}
