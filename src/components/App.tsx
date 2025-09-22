import OrderForm from './OrderForm';
import OrderList from './OrderList';
import { ConfigType, OrderType } from '../types';
import Container from '@mui/material/Container';
import StatusLine from './StatusLine';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNotification } from '../hooks/useDialog';
import Notification from './Notification';

export default function App() {
  const [config, setConfig] = useLocalStorage<ConfigType>('config', {
    chickenQuantity: 50,
    chickenPrice: 18,
    halfChickenPrice: 9,
    potatoBucketPrice: 5,
    confirmDelete: true,
  });

  const [orders, setOrders] = useLocalStorage<OrderType[]>('orders', []);
  const { notificationState, notify, handleClose } = useNotification();

  const handleNewOrder = (order: { name: string; chickens: number; potatoBuckets: number }) => {
    setOrders((prevOrders) => [...prevOrders, { id: Date.now(), ...order, delivered: false }]);
  };

  const handleDirectDelivery = (order: { name: string; chickens: number; potatoBuckets: number }) => {
    setOrders((prevOrders) => [...prevOrders, { id: Date.now(), ...order, delivered: true }]);
  };

  const toggleDelivered = (orderId: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === orderId ? { ...order, delivered: !order.delivered } : order)),
    );
  };

  const handleRemove = (orderId: number) => {
    const orderToRemove = orders.find((order) => order.id === orderId);
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));

    if (orderToRemove) {
      notify({
        message: `Commande de ${orderToRemove.name} supprimée`,
        severity: 'info',
      });
    }
  };

  const handleClear = () => {
    localStorage.clear();
    setOrders([]);
  };

  return (
    <Container>
      <OrderForm onNewOrder={handleNewOrder} onDirectDelivery={handleDirectDelivery} config={config} orders={orders} />
      <OrderList orders={orders} onDelivered={toggleDelivered} handleRemove={handleRemove} config={config} />
      <StatusLine config={config} setConfig={setConfig} orders={orders} onClear={handleClear} />

      <Notification
        open={notificationState.open}
        message={notificationState.options.message}
        severity={notificationState.options.severity}
        onClose={handleClose}
        autoHideDuration={notificationState.options.autoHideDuration}
      />
    </Container>
  );
}
