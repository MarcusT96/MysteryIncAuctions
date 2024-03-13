import { useEffect, useState } from "react"
import Payment from "./Payment.jsx"

function OrderHistory() {

  const [orders, setOrders] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/bought_boxes`)
      const data = await response.json()
      let orderData = []
      for (let order of data) {
        if (order.buyer_id == localStorage.currentUserId) {
          orderData.push(order)
        }
      }
      setOrders(orderData)
    }
    load()
  }, [])

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  }

  function orderStatus(order) {
    if (order.paid == false) {
      return <button className="orderhistory-paybutton" onClick={() => handleOrderClick(order)}>Betala nu</button>
    }
    else if (order.delivered == false) {
      return <button className="orderhistory-payedbutton">Betald</button>
    }
    else {
      return <button className="orderhistory-deliveredbutton">Levererad</button>
    }
  }

  function formatTime(timestamp) {
    const date = new Date(timestamp)

    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}`
  }

  const handlePaymentComplete = (updatedOrder) => {
    const updatedOrders = orders.map((order) =>
      order.id === updatedOrder.id ? updatedOrder : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="orderhistory-container">
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div className="orderhistory-order" key={index}>
            <img src={order.image} />
            <div className="orderhistory-details">
              <h3>{order.name}</h3>
              <p>{order.price}kr</p>
              <p>Vunnen: {formatTime(order.time)}</p>
              <p>Status: {orderStatus(order)}</p>
            </div>
          </div>
        ))) : <p>Du har inga Beställningar</p>}
      {isModalOpen && <Payment isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        onPaymentComplete={handlePaymentComplete} />}
    </div>
  )
}

export default OrderHistory
