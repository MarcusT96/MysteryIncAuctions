export const handleBidConfirm = async (box, bidAmount, setBox, setIsModalVisible, toast) => {
  if (!box || bidAmount <= box.price) {
    toast.warn("Budet måste vara högre än nuvarande högsta bud.");
    return;
  }

  try {
    
    let response = await fetch(`http://localhost:3000/mystery_boxes/${box.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: bidAmount }),
    });

    if (!response.ok) throw new Error('Network response was not ok when updating box price.');

    const updatedBox = await response.json();
    setBox(updatedBox);
    toast.success(`Bud bekräftat! Nytt högsta bud: ${bidAmount} SEK`);


    const userId = localStorage.getItem('currentUserId'); 
    if (!userId) {
      toast.error("Användare är inte inloggad.");
      return;
    }

    const bidData = {
      boxId: box.id,
      value: bidAmount,
      userId: userId
    };

    response = await fetch(`http://localhost:3000/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bidData),
    });

    if (!response.ok) throw new Error('Network response was not ok when posting bid.');

 
    setIsModalVisible(false);
  } catch (error) {
    console.error('Failed to update the bid or save bid data:', error);
    toast.error("Ett fel inträffade när budet skulle uppdateras eller sparas.");
  }
};

