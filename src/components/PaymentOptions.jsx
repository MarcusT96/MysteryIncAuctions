import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
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
    },
  }

  useEffect(() => {
    async function load() {
      const response = await fetch(`http://localhost:3000/payment_options`)
      const data = await response.json()
      let paymentData = []
      for (let method of data) {
        if (method.user_id == localStorage.currentUserId) {
          paymentData.push(method)
        }
      }
      setPaymentInfo(paymentData)
    }
    load()
  }, [])

  function censorCard(cardNumber) {
    let censored = cardNumber.slice(0, 4)
    censored = censored + "-XXXX-XXXX-XXXX"
    return censored
  }

  const removePaymentOption = async (paymentId) => {
    await fetch(`http://localhost:3000/payment_options/${paymentId}`, {
      method: 'DELETE',
    })

    setPaymentInfo((prevPaymentInfo) =>
      prevPaymentInfo.filter((payment) => payment.id !== paymentId)
    )
  }

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div>
      <h2>Betalningsalternativ</h2>
      <p>Här kan du hantera dina betalningsalternativ.</p>
      <button className='paymentopt-addpay' onClick={openModal}>Lägg till betalningsalternativ</button>

      <Modal isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="paymentopt-add">

        <h2 className='paymentopt-modal-text'>Lägg till</h2>

        <p className='paymentopt-modal-text'>Typ</p>
        <select name="cardtype" id="type">
          <option value="Credit card">Kredit kort</option>
          <option value="Debit card">Debit kort</option>
        </select>
        
        <p className='paymentopt-modal-text'>Kort nummer</p>
        <input type="text"
          value={cardNumber}
          onChange={(e) => { setCardNumber(e.target.value) }}
          placeholder='Kort nummer' />
        
        <p className='paymentopt-modal-text'>Utgångsdatum</p>
        <input type="text"
          value={expDate}
          onChange={(e) => { setExpDate(e.target.value) }}
          placeholder='Utgångs datum' />
        
        <p className='paymentopt-modal-text'>CVC</p>
        <input type="text"
          value={cardCvc}
          onChange={(e) => { setCardCvc(e.target.value) }}
          placeholder='CVC' />
        
        <p className='paymentopt-modal-text'>Kort ägare</p>
        <input type="text"
          value={cardHolder}
          onChange={(e) => { setCardHolder(e.target.value) }}
          placeholder='Kort ägare' />

        <button onClick={closeModal}>Klar</button>
        <button onClick={closeModal}>Avbryt</button>
      </Modal>

      <div className='paymentopt-method-container'>
        {paymentInfo.map((payment, index) => (
          <div className='paymentopt-method' key={index}>
            <h2 className='paymentopt-type'>{payment.type}</h2>
            <p className='paymentopt-holder'>Ägare: {payment.cardholder_name}</p>
            <p className='paymentopt-number'>{censorCard(payment.card_number)}</p>
            <button className='paymentopt-remove' onClick={() => removePaymentOption(payment.id)}>Ta bort</button>
          </div>
        ))}
      </div>
      {/* Här lägger vi till logik och UI-element för betalningsalternativen */}
    </div>
  );
}

export default PaymentOptions;
