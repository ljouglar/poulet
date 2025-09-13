import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControlLabel, Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useRef, useState } from 'react';
import { ConfigType, OrderType } from '../types';

interface TitleLineProps {
  config: ConfigType;
  setConfig: (config: ConfigType) => void;
  orders: OrderType[];
  onClear: () => void;
}

export default function StatusLine({ config, setConfig, orders, onClear }: TitleLineProps) {
  const [open, setOpen] = useState(false);
  const [chickenQuantity, setChickenQuantity] = useState(config.chickenQuantity);
  const [chickenPrice, setChickenPrice] = useState('' + config.chickenPrice);
  const [halfChickenPrice, setHalfChickenPrice] = useState('' + config.halfChickenPrice);
  const [potatoBucketPrice, setPotatoBucketPrice] = useState('' + config.potatoBucketPrice);
  const [confirmDelete, setConfirmDelete] = useState(config.confirmDelete);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setConfig({
      chickenQuantity,
      chickenPrice: isNaN(parseFloat(chickenPrice)) ? config.chickenPrice : parseFloat(chickenPrice),
      halfChickenPrice: isNaN(parseFloat(halfChickenPrice)) ? config.halfChickenPrice : parseFloat(halfChickenPrice),
      potatoBucketPrice: isNaN(parseFloat(potatoBucketPrice))
        ? config.potatoBucketPrice
        : parseFloat(potatoBucketPrice),
      confirmDelete,
    });
    setOpen(false);
  };

  const handleCancel = () => {
    setChickenQuantity(config.chickenQuantity);
    setChickenPrice('' + config.chickenPrice);
    setHalfChickenPrice('' + config.halfChickenPrice);
    setPotatoBucketPrice('' + config.potatoBucketPrice);
    setConfirmDelete(config.confirmDelete);
    setOpen(false);
  };

  const getOrderPrice = (sum: number, order: OrderType) =>
    (sum +=
      Math.floor(order.chickens) * config.chickenPrice +
      (order.chickens - Math.floor(order.chickens)) * 2 * config.halfChickenPrice +
      order.potatoBuckets * config.potatoBucketPrice);

  const deliveredOrders = orders.filter((order) => order.delivered);
  const deliveredQuantity = deliveredOrders.reduce((sum, order) => (sum += order.chickens), 0);
  const deliveredPrice = deliveredOrders.reduce(getOrderPrice, 0);

  const waitingOrders = orders.filter((order) => !order.delivered);
  const waitingChickenQuantity = waitingOrders.reduce((sum, order) => (sum += order.chickens), 0);
  const waitingPotatoQuantity = waitingOrders.reduce((sum, order) => (sum += order.potatoBuckets), 0);
  const waitingPrice = waitingOrders.reduce(getOrderPrice, 0);

  return (
    <Box width="100%" display="flex" alignItems="center">
      <Box
        width="100%"
        bgcolor="salmon"
        color="primary.contrastText"
        p={2}
        my={1}
        border="1px solid darkSalmon"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" gap={1} flex={3}>
          <Typography
            bgcolor="primary.light"
            variant="h5"
            width={150}
            height={40}
            border="1px solid #1976d2"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {waitingChickenQuantity} ({waitingPotatoQuantity}) att.
          </Typography>
          <Typography variant="h5">+</Typography>
          <Typography
            bgcolor="lightBlue"
            variant="h5"
            width={130}
            height={40}
            border="1px solid #42a5f5"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {deliveredQuantity} livré{deliveredQuantity > 1 ? 's' : ''}
          </Typography>
          <Typography variant="h5">=</Typography>
          <Typography variant="h5" color={deliveredQuantity + waitingChickenQuantity > config.chickenQuantity ? 'error' : ''}>
            {deliveredQuantity + waitingChickenQuantity} / {config.chickenQuantity} - Reste {config.chickenQuantity - (deliveredQuantity + waitingChickenQuantity)}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="flex-end" flex={1}>
            <Typography variant="h5"> {deliveredPrice + waitingPrice}€ </Typography>
          </Box>
        </Box>
        <IconButton
          color="error"
          onClick={() => {
            if (window.confirm('Êtes-vous sûr de vouloir tout effacer ?\nToutes les commandes seront perdues')) {
              onClear();
            }
          }}
          sx={{ width: 45 }}
        >
          <DeleteForeverIcon />
        </IconButton>
        <Button type="submit" variant="contained" sx={{ width: 100 }} onClick={() => setOpen(true)}>
          Config
        </Button>{' '}
      </Box>
      <Dialog open={open} onClose={handleCancel} disableRestoreFocus={true}>
        <DialogTitle>Configuration</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre de poulets apportés"
              type="number"
              fullWidth
              value={chickenQuantity}
              onChange={(e) => setChickenQuantity(+e.target.value)}
              inputRef={nameInputRef}
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={confirmDelete}
                  onChange={(e) => setConfirmDelete(e.target.checked)}
                />
              }
              label="Demander confirmation avant suppression de commande"
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleCancel}>
              Annuler
            </Button>
            <Button color="success" type="submit">
              Sauvegarder
            </Button>
          </DialogActions>
        </form>
      </Dialog>{' '}
    </Box>
  );
}
