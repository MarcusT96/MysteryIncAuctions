import { useState } from 'react';

function ReviewForm({ boxId, onSubmit }) {
  const [reviewDetails, setReviewDetails] = useState({
    score: '',
    title: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSubmit(boxId, reviewDetails);
    setReviewDetails({ score: '', title: '', description: '' }); 
  };

  return (
    <form onSubmit={handleSubmit}
    className='review--container'>
      <select
        name="score"
        value={reviewDetails.score || ''}
        onChange={handleInputChange}
        required
      >
        <option value="" disabled>Hur nöjd är du med denna box? (5 är högst)</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <input
        type="text"
        name="title"
        placeholder="Rubrik"
        value={reviewDetails.title}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="description"
        placeholder="Berätta gärna vad du tyckte om boxen!"
        value={reviewDetails.description}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
