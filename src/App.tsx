import { useEffect, useState } from "react";
import OrderForm from "./OrderForm";
import OrderList from "./OrderList";
import StatusLine from "./StatusLine";
import { OrderType } from "./types";
import Container from "@mui/material/Container";

export default function App() {
  const [orders, setOrders] = useState<Array<OrderType>>(
    localStorage.getItem("orders")
      ? JSON.parse(localStorage.getItem("orders")!)
      : []
  );

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const handleNewOrder = (order: {
    name: string;
    chickens: number;
    potatoBuckets: number;
  }) => {
    setOrders((prevOrders) => [
      ...prevOrders,
      { id: Date.now(), ...order, delivered: false },
    ]);
  };

  const handleDelivered = (orderId: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, delivered: true } : order
      )
    );
  };

  const handleClear = () => {
    localStorage.clear();
    setOrders([]);
  };

  return (
    <Container>
      <OrderForm onNewOrder={handleNewOrder} />
      <OrderList orders={orders} onDelivered={handleDelivered} />
      <StatusLine orders={orders} onClear={handleClear} />
    </Container>
  );
}
