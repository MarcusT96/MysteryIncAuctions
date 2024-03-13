import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BidPopUp from "../components/BidPopUp.jsx";
import { toast } from 'react-toastify';
import CountdownTimer from '../components/CountDownTimer.jsx';
import { handleBidConfirm } from '../utils/bidHandling.js';

export default function ObjectPage() {
  const [box, setBox] = useState(null);
  const [category, setCategory] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/mystery_boxes/${id}`);
      const boxData = await response.json();
      console.log(boxData)
      setBox(boxData);

      // Assuming you have a separate endpoint for categories
      const categoryResponse = await fetch(`/api/categories/${boxData.category}`);
      const categoryData = await categoryResponse.json();
      console.log(categoryData)
      setCategory(categoryData);
    }
    load();
  }, [id]);

  const confirmBid = (bidAmount) => {
    handleBidConfirm(box, bidAmount, setBox, setIsModalVisible, toast);
  };

  const onCountdownEnd = () => {
    setAuctionEnded(true);
  };

  const showBidButton = () => !auctionEnded;


  const getBidText = () => auctionEnded ? `Slutpris: ${box.price} SEK` : `Nuvarande högsta bud: ${box.price} SEK`;

  if (!box || !category) return <div>Loading...</div>;

  return (
    <div className="objectpage-container">
      <div className="left--container">
        <img className="box--img" src={box.image} alt={box.name} />
        <p className="time--left">Tid kvar av auktion: <CountdownTimer endTime={box.time} onEnd={() => setAuctionEnded(true)} /></p>
      </div>
      <div className="right--container">
        <h3 className="box--title">{box.name}</h3>
        <p className="product--description">{box.description}</p>
        <p className="category-name">Kategori: <b>{category.categoryName}</b></p>
        <p className="highest--bid">{getBidText()}</p>
        {showBidButton() && (
          <button className="bid--button" onClick={() => setIsModalVisible(true)}>Lägg bud</button>
        )}
        {isModalVisible && (
          <BidPopUp
            box={box}
            onClose={() => setIsModalVisible(false)}
            onConfirm={(bidAmount) => confirmBid(bidAmount)}
          />
        )}
      </div>
    </div>
  );
}