import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Payment({ isOpen, onClose, order, onPaymentComplete }) {

  const [cardType, setCardType] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expDate, setExpDate] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [cardHolder, setCardHolder] = useState("")

  const [paymentInfo, setPaymentInfo] = useState([])
  const [paymentStatus, setPaymentStatus] = useState("")

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
      const response = await fetch(`/api/payment_options`)
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

  const handlePaymentCardClick = (payment) => {
    setCardType(payment.type)
    setCardNumber(payment.card_number)
    setExpDate(payment.expiration_date)
    setCardCvc(payment.CVC)
    setCardHolder(payment.cardholder_name)
  }

  const handlePaymentConfirmation = async () => {
    try {
      const response = await fetch(`/api/bought_boxes/${order.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paid: true })
      })

      if (response.ok) {
        toast.success("Betalning gick igenom!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        const updatedOrder = { ...order, paid: true }
        setPaymentStatus("Payment successful")
        onPaymentComplete(updatedOrder)
        onClose()
      } else {
        console.error('Failed to update payment status')
        toast.error("Betalning misslyckad", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      }
    } catch (error) {
      toast.error(`Betalning misslyckad, ${error}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      console.error('Error occurred while updating payment status:', error)
    }
  }

  return (
    <Modal isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}>
      <h2>Betalning</h2>

      <div className='pay-order-options'>
        <div className='pay-order'>
          <h3>{order.name}</h3>
          <p>Kostnad: {order.price}kr</p>
        </div>
        <div className='pay-options'>
          {paymentInfo.map((payment, index) => (
            <div className='pay-card' key={index} onClick={() => handlePaymentCardClick(payment)}>
              <p>{payment.type}</p>
              <p>{censorCard(payment.card_number)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='pay-details'>
        <p className='paymentopt-modal-text'>Typ</p>
        <select className="paymentopt-modal-selector" name="cardtype" id="type"
          value={cardType} onChange={(e) => setCardType(e.target.value)}>
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
      </div>
      <button className="paymentopt-modal-button-finish" onClick={handlePaymentConfirmation}>Klar</button>
      <button className="paymentopt-modal-button-cancel" onClick={onClose}>Avbryt</button>
    </Modal>
  )
}

export default Payment