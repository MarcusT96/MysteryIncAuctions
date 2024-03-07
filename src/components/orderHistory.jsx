import { useEffect, useState } from "react"

function OrderHistory() {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function load() {
      const response = await fetch(`http://localhost:3000/bought_boxes`)
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

  function orderStatus(order) {
    if (order.paid == false) {
      return <button className="orderhistory-paybutton">Betala nu</button>
    }
    else if (order.delivered == false) {
      return <button className="orderhistory-payedbutton">Betald</button>
    }
    else {
      return <button className="orderhistory-deliveredbutton">Levererad</button>
    }
  }

  return (
    <div className="orderhistory-container">
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div className="orderhistory-order" key={index}>
            <img src={order.image} />
            <div className="orderhistory-details">
              <h3>{order.name}</h3>
              <p>{order.price}kr</p>
              <p>Vunnen: {order.time}</p>
              <p>Status: {orderStatus(order)}</p>
            </div>
          </div>
        ))) : <p>Du har inga Beställningar</p>}

    </div>
  )
}

export default OrderHistory