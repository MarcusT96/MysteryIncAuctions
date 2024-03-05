import { useState } from "react";

export default function BidPopUp({ onClose, onConfirm }) {
  const [bid, setBid] = useState('');

  return (
    <div className="bid--background">
      <div className="bid--content">
        <p className="bid-disclaimer">
          Observera: Att lägga ett bud är juridiskt bindande. Genom att lägga ett bud förbinder du dig att köpa objektet till det budgivna priset om du vinner auktionen.
        </p>
        <input
          className="bid--input"
          type="number"
          value={bid}
          onChange={(e) => setBid(e.target.value)}
          placeholder="Ange ditt bud (SEK)"
        />
        <button
          className="bid--button"
          onClick={() => onConfirm(bid)}
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