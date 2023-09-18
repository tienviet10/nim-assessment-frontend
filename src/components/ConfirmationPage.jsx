import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import url from "../domain";
import "./styles/ConfirmationPage.css";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${url}/api/orders/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }
        const data = await response.json();
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return <OrderConfirmation order={order} />;
}

export default ConfirmationPage;
