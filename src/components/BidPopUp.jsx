import { useState } from "react";
import { toast } from 'react-toastify';

export default function BidPopUp({ box, onClose, onConfirm }) {
  const [bid, setBid] = useState('');

  const submitBid = () => {
    const bidAmount = parseFloat(bid);
    if (bidAmount > box.price) {
      onConfirm(bidAmount);
    } else {
      toast.warn("Ditt bud måste vara högre än det nuvarande högsta budet.");
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