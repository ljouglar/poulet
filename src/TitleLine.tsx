import { Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Typography } from '@mui/material';
import { useState } from 'react';
import { ConfigType, OrderType } from './types';

interface TitleLineProps {
  config: ConfigType;
  setConfig: (config: ConfigType) => void;
  orders: OrderType[];
}

export default function TitleLine({ config, setConfig, orders }: TitleLineProps) {
  const [open, setOpen] = useState(false);
  const [chickenQuantity, setChickenQuantity] = useState(config.chickenQuantity);
  const [chickenPrice, setChickenPrice] = useState('' + config.chickenPrice);
  const [halfChickenPrice, setHalfChickenPrice] = useState('' + config.halfChickenPrice);
  const [potatoBucketPrice, setPotatoBucketPrice] = useState('' + config.potatoBucketPrice);

  const handleSave = () => {
    setConfig({
      chickenQuantity,
      chickenPrice: isNaN(parseFloat(chickenPrice)) ? config.chickenPrice : parseFloat(chickenPrice),
      halfChickenPrice: isNaN(parseFloat(halfChickenPrice)) ? config.halfChickenPrice : parseFloat(halfChickenPrice),
      potatoBucketPrice: isNaN(parseFloat(potatoBucketPrice))
        ? config.potatoBucketPrice
        : parseFloat(potatoBucketPrice),
    });
    localStorage.setItem('config', JSON.stringify(config));
    setOpen(false);
  };

  const deliveredOrders = orders.filter((order) => order.delivered);

  const deliveredQuantity = deliveredOrders.reduce((sum, order) => (sum += order.chickens), 0);

  const deliveredPrice = deliveredOrders.reduce(
    (sum, order) =>
      (sum +=
        Math.floor(order.chickens) * config.chickenPrice +
        (order.chickens - Math.floor(order.chickens)) * 2 * config.halfChickenPrice +
        order.potatoBuckets * config.potatoBucketPrice),
    0,
  );

  return (
    <Box width="100%" display="flex" alignItems="center">
      <Box
        width="100%"
        bgcolor="primary.dark"
        color="primary.contrastText"
        p={2}
        my={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h3" sx={{ flex: 1 }}>
          Poulets
        </Typography>
        <Box display="flex" alignItems="center" sx={{ gap: 2, flex: 3 }}>
          <Box component="img" src="chicken.png" alt="chicken" sx={{ width: 50, height: 50 }} />
          <Typography variant="h5">
            {deliveredQuantity} livré{deliveredQuantity > 1 ? 's' : ''} / {config.chickenQuantity} (tot+pdt {deliveredPrice}€)
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ gap: 2, flex: 1 }}>
          <Typography variant="h6">
            ({config.chickenPrice} / {config.halfChickenPrice} / {config.potatoBucketPrice}){' '}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ gap: 2, flex: 1 }}>
          <Button type="submit" variant="contained" sx={{ width: 130 }} onClick={() => setOpen(true)}>
            Config
          </Button>{' '}
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Configuration</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de poulets apportés"
            type="number"
            fullWidth
            value={chickenQuantity}
            onChange={(e) => setChickenQuantity(+e.target.value)}
          />
          <TextField
            margin="dense"
            label="Prix du poulet"
            type="text"
            fullWidth
            value={chickenPrice}
            onChange={(e) => setChickenPrice(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Prix du demi-poulet"
            type="text"
            fullWidth
            value={halfChickenPrice}
            onChange={(e) => setHalfChickenPrice(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Prix du godet de pommes de terre"
            type="text"
            fullWidth
            value={potatoBucketPrice}
            onChange={(e) => setPotatoBucketPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={() => handleSave()}>Sauvegarder</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
