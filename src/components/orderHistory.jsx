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
    let status = ""
    if (order.paid == false) {
      status = "Ej betald"
    }
    else if (order.delivered == false) {
      status = "Betald"
    }
    else {
      status = "Levererad"
    }
    return status
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