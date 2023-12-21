import { Box, Button, Typography } from "@mui/material";
import { OrderType } from "./types";

interface StatusLineProps {
  orders: Array<OrderType>;
  onClear: () => void;
}

export default function StatusLine({ orders, onClear }: StatusLineProps) {
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
      bgcolor="salmon"
      color="primary.contrastText"
      p={2}
      my={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h3" sx={{ width: 200 }}>
        À livrer
      </Typography>
      <Box display="flex" alignItems="center" sx={{ gap: 2, width: 250 }}>
        <Box
          component="img"
          src="chicken.png"
          alt="chicken"
          sx={{ width: 50, height: 50 }}
        />
        <Typography variant="h5">{undeliveredChickens}</Typography>{" "}
      </Box>
      <Box display="flex" alignItems="center" sx={{ gap: 2, width: 250 }}>
        <Box
          component="img"
          src="potato.png"
          alt="potato"
          sx={{ width: 50, height: 50 }}
        />
        <Typography variant="h5">{undeliveredPotatoBuckets}</Typography>{" "}
      </Box>
      <Button
        type="submit"
        variant="contained"
        sx={{ width: 100 }}
        onClick={() => {
          if (window.confirm("Êtes-vous sûr de vouloir tout effacer ?")) {
            onClear();
          }
        }}
      >
        Effacer
      </Button>{" "}
    </Box>
  );
}
