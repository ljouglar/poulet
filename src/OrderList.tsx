import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Order from "./Order";
import { ConfigType, OrderType } from "./types";

interface OrderListProps {
  orders: OrderType[];
  onDelivered: (id: number) => void;
  config: ConfigType;
}

export default function OrderList({ orders, onDelivered, config }: OrderListProps) {
  const sortedOrders = [...orders].sort(
    (a, b) => (a.delivered === b.delivered ? 0 : a.delivered ? 1 : -1) // || a.name.localeCompare(b.name)
  );

  return (
    <Box
      sx={{
        maxHeight: "calc(100vh - 330px)",
        overflow: "auto",
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <List>
        {sortedOrders.map((order) => (
          <Order key={order.id} order={order} onDelivered={onDelivered} config={config} />
        ))}
      </List>
    </Box>
  );
}
