import Order from "./Order";
import { OrderType } from "./types";

interface OrderListProps {
  orders: OrderType[];
  onDelivered: (id: number) => void;
}

export default function OrderList({ orders, onDelivered }: OrderListProps) {
  const sortedOrders = [...orders].sort((a, b) =>
    a.delivered === b.delivered ? 0 : a.delivered ? 1 : -1
  );

  return (
    <div>
      {sortedOrders.map((order) => (
        <Order key={order.id} order={order} onDelivered={onDelivered} />
      ))}
    </div>
  );
}
