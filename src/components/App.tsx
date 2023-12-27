import { useEffect, useState } from 'react';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import { ConfigType, OrderType } from '../types';
import Container from '@mui/material/Container';
import StatusLine from './StatusLine';

export default function App() {
  const [config, setConfig] = useState<ConfigType>(
    localStorage.getItem('config')
      ? JSON.parse(localStorage.getItem('config') as string)
      : {
          chickenQuantity: 0,
          chickenPrice: 18,
          halfChickenPrice: 9,
          potatoBucketPrice: 5,
        },
  );
  const [orders, setOrders] = useState<Array<OrderType>>(
    localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')!) : [],
  );

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('config', JSON.stringify(config));
  }, [config]);

  const handleNewOrder = (order: { name: string; chickens: number; potatoBuckets: number }) => {
    setOrders((prevOrders) => [...prevOrders, { id: Date.now(), ...order, delivered: false }]);
  };

  const toggleDelivered = (orderId: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, delivered: !order.delivered } : order)),
    );
  };

  const handleRemove = (orderId: number) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  const handleClear = () => {
    localStorage.clear();
    setOrders([]);
  };

  return (
    <Container>
      <OrderForm onNewOrder={handleNewOrder} config={config} />
      <OrderList orders={orders} onDelivered={toggleDelivered} handleRemove={handleRemove} config={config} />
      <StatusLine config={config} setConfig={setConfig} orders={orders} onClear={handleClear} />
    </Container>
  );
}
