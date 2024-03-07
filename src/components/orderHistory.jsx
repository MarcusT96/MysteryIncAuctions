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

  return (
    <div className="orderhistory-container">
      {orders.map((order, index) => (
        <div className="orderhistory-order" key={index}>
          <img src={order.image} />
          <h3>{order.name}</h3>
          <p>{order.price}kr</p>
        </div>
      ))}
    </div>
  )
}

export default OrderHistory