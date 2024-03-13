import Modal from 'react-modal'

function Payment({ isOpen, onClose }) {

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
      <h2>Payment Modal</h2>
      {/* Add your payment form and logic here */}
      <button onClick={onClose}>Close Modal</button>
    </Modal>
  )
}

export default Payment