import React from "react";

function OrderConfirmation({ order }) {
  const formatTimestamp = (timestamp) => new Date(timestamp).toLocaleString();
  return (
    <div className="confirmation-container">
      <h2 className="confirmation-title">Thank you for your order</h2>
      <div className="order-details">
        <p className="order-id">Order ID: {order.id}</p>
        <p className="customer-info">Name: {order.name}</p>
        <p className="customer-info">Address: {order.address}</p>
        <p className="customer-info">Phone: {order.phone}</p>
        <p className="order-status">Status: {order.status}</p>
        <p className="timestamp">
          Created At: {formatTimestamp(order.createdAt)}
        </p>
        <p className="timestamp">
          Updated At: {formatTimestamp(order.updatedAt)}
        </p>
      </div>

      <h3 className="order-items-title">Order Items</h3>
      <ul className="order-items-list">
        {order.items.map((orderItem) => (
          <li key={orderItem.item.id} className="order-item">
            <p className="item-name">Item Name: {orderItem.item.name}</p>
            <p className="item-price">Item Price: ${orderItem.item.price}</p>
            <p className="item-description">
              Item Description: {orderItem.item.description}
            </p>
            <p className="item-quantity">Quantity: {orderItem.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderConfirmation;
