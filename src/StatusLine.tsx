import { Box, Button, Typography } from '@mui/material';
import { OrderType } from './types';

interface StatusLineProps {
  orders: Array<OrderType>;
  onClear: () => void;
}

export default function StatusLine({ orders, onClear }: StatusLineProps) {
  const undeliveredOrders = orders.filter((order) => !order.delivered);
  const undeliveredChickens = undeliveredOrders.reduce((total, order) => total + order.chickens, 0);
  const undeliveredPotatoBuckets = undeliveredOrders.reduce((total, order) => total + order.potatoBuckets, 0);

  return (
    <Box width="100%" display="flex" alignItems="center">
      <Box
        width="100%"
        bgcolor="salmon"
        color="primary.contrastText"
        p={2}
        my={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4" sx={{ flex: 1 }}>
          Commandés
        </Typography>
        <Box display="flex" alignItems="center" sx={{ gap: 2, flex: 1 }}>
          <Box component="img" src="chicken.png" alt="chicken" sx={{ width: 50, height: 50 }} />
          <Typography variant="h4">{undeliveredChickens}</Typography>{' '}
        </Box>
        <Box display="flex" alignItems="center" sx={{ gap: 2, flex: 1 }}>
          <Box component="img" src="potato.png" alt="potato" sx={{ width: 50, height: 50 }} />
          <Typography variant="h4">{undeliveredPotatoBuckets}</Typography>{' '}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ gap: 2, flex: 1 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: 130 }}
            onClick={() => {
              if (window.confirm('Êtes-vous sûr de vouloir tout effacer ?')) {
                onClear();
              }
            }}
          >
            Effacer
          </Button>{' '}
        </Box>
      </Box>
    </Box>
  );
}
