import { useEffect, useState } from "react"

function OrderHistory() {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function load() {
      const response = await fetch(`http://localhost:3000/bought_boxes`)
      const data = await response.json()
      setOrders(data)
    }
    load()
  }, [])

  function orderStatus(order) {
    let status = ""
    if (order.paid == false) {
      status = "Ej betalad"
    }
    else if (order.delivered == false) {
      status = "Betalad"
    }
    else {
      status = "Levererad"
    }
    return status
  }

  return (
    <div className="orderhistory-container">
      {orders.map((order, index) => (
        <div className="orderhistory-order" key={index}>
          <img src={order.image} />
          <div className="orderhistory-details">
            <h3>{order.name}</h3>
            <p>{order.price}kr</p>
            <p>Status: {orderStatus(order)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderHistory