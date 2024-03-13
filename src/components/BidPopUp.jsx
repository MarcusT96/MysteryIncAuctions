import { useState } from "react";
import { toast } from 'react-toastify';
import { useModal } from "../contexts/LogInContext";

export default function BidPopUp({ box, onClose, onConfirm }) {
  const [bid, setBid] = useState('');
  const { toggleLoginModal } = useModal();

  const submitBid = () => { //Bud skickas igenom om man är inloggad. 
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {

      onClose(); // Stänger öppna UI element först
      toast.warn("Du måste vara inloggad för att kunna lägga bud, vänligen logga in först!")
      toggleLoginModal(); // Visa loginmodulen
      return;
    }


    const bidAmount = parseFloat(bid); //Gör om budet från string
    if (bidAmount > box.price) { //Om budet är högre än nuvarande pris så går det igenom och skickas vidare
      onConfirm(bidAmount);
    } else {
      toast.warn("Ditt bud måste vara högre än det nuvarande högsta budet."); //Varnar om att budet måste vara högre än nuvarande
    }
  };


  return (
    <div className="bid--background">
      <div className="bid--content">
        <p className="bid-disclaimer">
          Observera: Att lägga ett bud är juridiskt bindande. Genom att lägga ett bud förbinder du dig att köpa objektet till det budgivna priset om du vinner auktionen.
        </p>
        <p className="bid-disclaimer"><b>Nuvarande högsta bud: {box.price} SEK</b></p>
        <input
          className="bid--input"
          type="number"
          value={bid}
          onChange={(e) => setBid(e.target.value)}
          placeholder="Ange ditt bud (SEK)"
        />
        <button
          className="bid--button"
          onClick={submitBid}
        >
          Bekräfta bud
        </button>
        <button
          className="bid--close-button"
          onClick={onClose}
        >
          Stäng
        </button>
      </div>
    </div>
  );
}