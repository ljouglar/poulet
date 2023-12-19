import { useState } from "react";
import { Box } from "@mui/system";
import OrderForm from "./OrderForm";
import OrderList from "./OrderList";
import StatusLine from "./StatusLine";
import { OrderType } from "./types";

export default function App() {
  const [orders, setOrders] = useState<OrderType[]>([]);

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

  return (
    <div>
      <Box>
        <OrderForm onNewOrder={handleNewOrder} />
      </Box>
      <OrderList orders={orders} onDelivered={handleDelivered} />
      <Box bgcolor="lightblue">
        <StatusLine orders={orders} />
      </Box>
    </div>
  );
}
