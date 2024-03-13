import Modal from 'react-modal'

function Payment({ isOpen, onClose, order }) {

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


  return (
    <Modal isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}>
      <h2>Betalning</h2>
      <p>{order.price}</p>
      <button className="paymentopt-modal-button-finish" onClick={onClose}>Klar</button>
      <button className="paymentopt-modal-button-cancel" onClick={onClose}>Avbryt</button>
    </Modal>
  )
}

export default Payment