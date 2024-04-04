import { useState, useEffect } from 'react';
import { useAuth } from '../admin/AdminComponents/auth/AuthContext';
import ReviewForm from './ReviewForm'; 
import { toast } from 'react-toastify';

export default function Reviews() {
  const [boughtBoxes, setBoughtBoxes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        try {
          //Hämtar köpta boxar för den inloggade användaren
          const boxesResponse = await fetch(`/api/bought_boxes?buyer_id=${user.id}`);
          const boxesData = await boxesResponse.json();

     
          const reviewsResponse = await fetch(`/api/reviews?userId=${user.id}`);
          const reviewsData = await reviewsResponse.json();

          const reviewedIds = new Set(reviewsData.map(review => review.boxId));
          //Filtrerar bort de som blivit reviewade 
          const unreviewedBoxes = boxesData.filter(box => !reviewedIds.has(box.id));

          setBoughtBoxes(unreviewedBoxes);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [user]);
  //Skickar review till db.json via api med tillhörande boxid och reviewdetails. Det kommer sedan synka upp på framsidan av hemsidan
  const submitReview = async (boxId, reviewDetails) => {
    const review = { ...reviewDetails, boxId, userId: user.id }; 
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });
      if (!response.ok) { //Felhantering
        throw new Error('Network response was not ok.');
      }
      
      toast.success('Tack för din feedback!');

      //Ändrar så att sidan bara visar de boxar som inte blivit reviewade än
      setBoughtBoxes(prevBoughtBoxes => prevBoughtBoxes.filter(box => box.id !== boxId));
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Något gick fel, försök igen!');
    }
  };

  return (
    <div className='reviews--header'>
      {boughtBoxes.map((box) => (
        <div key={box.id}>
          <h3 className='review--title'>{box.name}</h3>
          <img src={box.image}
            className='review--image' />
          <ReviewForm boxId={box.id} onSubmit={submitReview} />
        </div>
      ))}
    </div>
  );
}
