import React, { useState, useEffect } from 'react';

function PaymentOptions() {

  const [paymentInfo, setPaymentInfo] = useState([])

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

  return (
    <div>
      <h2>Betalningsalternativ</h2>
      <p>Här kan du hantera dina betalningsalternativ.</p>
      <button className='paymentopt-addpay'>Lägg till betalningsalternativ</button>
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
