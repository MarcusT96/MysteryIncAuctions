import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'


function PaymentOptions() {

  const [paymentInfo, setPaymentInfo] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false)

  const [cardNumber, setCardNumber] = useState("")
  const [expDate, setExpDate] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [cardHolder, setCardHolder] = useState("")

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: "#9EA5E4",
      width: "50vw",
      border: "0vw",
      borderRadius: "0.5vw"
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)"
    }
  }

  useEffect(() => {
    async function load() {
      let userId = localStorage.currentUserId
      const response = await fetch(`/api/payment_options/${userId}`)
      const data = await response.json()
      setPaymentInfo(data)
    }
    load()
  }, [])

  function censorCard(cardNumber) {
    if (cardNumber) {
      let censored = cardNumber.slice(0, 4)
      censored = censored + "-XXXX-XXXX-XXXX"
      return censored
    }
    return ""
  }


  const removePaymentOption = async (paymentId) => {
    await fetch(`/api/payment_options/${paymentId}`, {
      method: 'DELETE',
    })

    setPaymentInfo((prevPaymentInfo) =>
      prevPaymentInfo.filter((payment) => payment.id !== paymentId)
    )
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    console.log("Closing modal...")
    setIsOpen(false)
  }

  const addPaymentOption = async () => {
    const data = {
      CardNumber: cardNumber,
      ExpirationDate: expDate,
      CVC: cardCvc,
      Type: document.getElementById('type').value,
      CardholderName: cardHolder,
      UserId: parseInt(localStorage.currentUserId)
    }

    try {
      const response = await fetch(`/api/payment_options/`, {
        method: `POST`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        closeModal(); // Close the modal
        console.log("Modal closed successfully.");
        const newPaymentOption = await response.json();
        setPaymentInfo(prevPaymentInfo => [...prevPaymentInfo, newPaymentOption]);
      } else {
        console.error('Failed to add payment option');
      }
    } catch (error) {
      console.error('Error adding payment option:', error);
    }
  }

  return (
    <div className='paymentopt-container'>
      <h2>Betalningsalternativ</h2>
      <p>Här kan du hantera dina betalningsalternativ.</p>
      <button className='paymentopt-addpay' onClick={openModal}>Lägg till betalningsalternativ</button>

      <Modal isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="paymentopt-add">

        <h2 className='paymentopt-modal-text'>Lägg till</h2>

        <p className='paymentopt-modal-text'>Typ</p>
        <select className="paymentopt-modal-selector" name="cardtype" id="type">
          <option value="Credit card">Kredit kort</option>
          <option value="Debit card">Debit kort</option>
        </select>

        <p className='paymentopt-modal-text'>Kort nummer</p>
        <input type="text"
          value={cardNumber}
          onChange={(e) => { setCardNumber(e.target.value) }}
          placeholder='XXXX-XXXX-XXXX-XXXX' />

        <p className='paymentopt-modal-text'>Utgångsdatum</p>
        <input type="text"
          value={expDate}
          onChange={(e) => { setExpDate(e.target.value) }}
          placeholder='XX-XX' />

        <p className='paymentopt-modal-text'>CVC</p>
        <input type="text"
          value={cardCvc}
          onChange={(e) => { setCardCvc(e.target.value) }}
          placeholder='XXX' />

        <p className='paymentopt-modal-text'>Kort ägare</p>
        <input type="text"
          value={cardHolder}
          onChange={(e) => { setCardHolder(e.target.value) }}
          placeholder='' />

        <button className="paymentopt-modal-button-finish" onClick={addPaymentOption}>Klar</button>
        <button className="paymentopt-modal-button-cancel" onClick={closeModal}>Avbryt</button>
      </Modal>

      <div className='paymentopt-method-container'>
        {paymentInfo.map((payment, index) => (
          <div className='paymentopt-method' key={index}>
            <h2 className='paymentopt-type'>{payment.type}</h2>
            <p className='paymentopt-holder'>Ägare: {payment.cardholderName}</p>
            <p className='paymentopt-number'>{censorCard(payment.cardNumber)}</p>
            <button className='paymentopt-remove' onClick={() => removePaymentOption(payment.id)}>Ta bort</button>
          </div>
        ))}
      </div>
      {/* Här lägger vi till logik och UI-element för betalningsalternativen */}
    </div>
  );
}

export default PaymentOptions;
