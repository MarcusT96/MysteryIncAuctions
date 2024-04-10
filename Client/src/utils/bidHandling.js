export const handleBidConfirm = async (box, bidAmount, setBox, setIsModalVisible, toast) => {
  if (!box || bidAmount <= box.price) {
    toast.warn("Budet måste vara högre än nuvarande högsta bud.");
    return;
  }

  try {
    const userIdString = localStorage.getItem('currentUserId');
    const userId = parseInt(userIdString, 10); // Convert userId to an integer
    if (!userIdString || isNaN(userId)) { // Check if userIdString is null or if userId isn't a number
      toast.error("Användare är inte inloggad eller användarID är ogiltigt.");
      return;
    }

    const bidData = {
      BoxId: box.id,
      Value: bidAmount,
      UserId: userId
    };

    const response = await fetch(`/api/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bidData),
    });

    if (!response.ok) {
      // If there's a problem, log the status and text for more context
      const errorText = await response.text();
      console.error(`Bid post failed with status ${response.status}: ${errorText}`);
      throw new Error('Network response was not ok when posting bid.');
    }

    // Manually update the box state to reflect the new bid
    const updatedBox = { ...box, price: bidAmount };
    setBox(updatedBox);
    toast.success(`Bud bekräftat! Nytt högsta bud: ${bidAmount} SEK`);

    setIsModalVisible(false); // Close the modal
  } catch (error) {
    console.error('Failed to update the bid or save bid data:', error);
    toast.error("Ett fel inträffade när budet skulle uppdateras eller sparas. Detaljer: " + error.message);
  }
};
