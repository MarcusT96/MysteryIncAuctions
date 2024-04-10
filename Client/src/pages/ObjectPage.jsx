import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BidPopUp from "../components/BidPopUp.jsx";
import { toast } from 'react-toastify';
import CountdownTimer from '../components/CountDownTimer.jsx';
import { handleBidConfirm } from '../utils/bidHandling.js';

export default function ObjectPage() {
  const [box, setBox] = useState(null);
  const [categories, setCategories] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/mystery_boxes/${id}`);
      const boxData = await response.json();

      const categoriesResponse = await fetch(`/api/categories`);
      const categoriesData = await categoriesResponse.json();
      const categoriesMap = categoriesData.reduce((acc, category) => {
        acc[category.id] = category.categoryName; 
        return acc;
      }, {});

      setBox({
        ...boxData,
        categoryName: categoriesMap[boxData.category]
      });
      setCategories(categoriesMap); 
    }
    load();
  }, [id]);

  const confirmBid = (bidAmount) => {
    handleBidConfirm(box, bidAmount, setBox, setIsModalVisible, toast);
  };

  const onCountdownEnd = () => {
    setAuctionEnded(true);
  };

  if (!box) return <div>Något gick fel vid inläsning av box</div>;

  return (
    <div className="objectpage-container">
      <div className="left--container">
        <img className="box--img" src={box.image} alt={box.name} />
        <p className="time--left">Tid kvar av auktion: <CountdownTimer endTime={box.time} onEnd={onCountdownEnd} /></p>
      </div>
      <div className="right--container">
        <h3 className="box--title">{box.name}</h3>
        <p className="product--description">{box.description}</p>
        <p className="category-name">Kategori: <b>{box.categoryName}</b></p>
        <p className="highest--bid">{auctionEnded ? `Slutpris: ${box.price} SEK` : `Nuvarande högsta bud: ${box.price} SEK`}</p>
        {isModalVisible && (
          <BidPopUp
            box={box}
            onClose={() => setIsModalVisible(false)}
            onConfirm={confirmBid}
          />
        )}
        {!auctionEnded && (
          <button className="bid--button" onClick={() => setIsModalVisible(true)}>Lägg bud</button>
        )}
      </div>
    </div>
  );
}
