import { useState } from "react";

export default function BidPopUp({ onClose, onConfirm }) {
  const [bid, setBid] = useState('');

  return (
    <div className="bid-modal-background">
      <div className="bid-modal-content">
        <input
          className="bid-modal-input"
          type="number"
          value={bid}
          onChange={(e) => setBid(e.target.value)}
          placeholder="Ange ditt bud (SEK)"
        />
        <button
          className="bid-modal-button"
          onClick={() => onConfirm(bid)}
        >
          Bekräfta bud
        </button>
        <button
          className="bid-modal-close-button"
          onClick={onClose}
        >
          Stäng
        </button>
      </div>
    </div>
  );
}