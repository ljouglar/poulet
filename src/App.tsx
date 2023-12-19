import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import OrderForm from "./OrderForm";
import OrderList from "./OrderList";
import StatusLine from "./StatusLine";
import { OrderType } from "./types";

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
    <div>
      <Box>
        <OrderForm onNewOrder={handleNewOrder} />
      </Box>
      <OrderList orders={orders} onDelivered={handleDelivered} />
      <Box>
        <StatusLine orders={orders} onClear={handleClear} />
      </Box>
    </div>
  );
}
