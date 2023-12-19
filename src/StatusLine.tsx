import { Box, Typography } from "@mui/material";
import { OrderType } from "./types";

interface StatusLineProps {
  orders: OrderType[];
}

export default function StatusLine({ orders }: StatusLineProps) {
  const undeliveredOrders = orders.filter((order) => !order.delivered);
  const undeliveredChickens = undeliveredOrders.reduce(
    (total, order) => total + order.chickens,
    0
  );
  const undeliveredPotatoBuckets = undeliveredOrders.reduce(
    (total, order) => total + order.potatoBuckets,
    0
  );

  return (
    <Box
      bgcolor="lightblue"
      p={2}
      my={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h3" sx={{ width: 400 }}>Encore</Typography>
      <Box display="flex" alignItems="center" sx={{ gap: 2, width: 200 }}>
        <Typography variant="h5">{undeliveredChickens}</Typography>{" "}
        <Box
          component="img"
          src="chicken.png"
          alt="chicken"
          sx={{ width: 50, height: 50 }}
        />
      </Box>
      <Box display="flex" alignItems="center" sx={{ gap: 2, width: 200 }}>
        <Typography variant="h5">{undeliveredPotatoBuckets}</Typography>{" "}
        <Box
          component="img"
          src="potato.png"
          alt="potato"
          sx={{ width: 50, height: 50 }}
        />
      </Box>
      <Typography variant="h3" sx={{ width: 200 }}>à livrer</Typography>
    </Box>
  );
}
