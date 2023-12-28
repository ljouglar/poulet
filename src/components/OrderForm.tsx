import React, { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ConfigType } from '../types';

interface OrderFormProps {
  onNewOrder: (order: { name: string; chickens: number; potatoBuckets: number }) => void;
  config: ConfigType;
}

export default function OrderForm({ onNewOrder, config }: OrderFormProps) {
  const [name, setName] = useState('');
  const [chickens, setChickens] = useState(0);
  const [potatoBuckets, setPotatoBuckets] = useState(0);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || (!chickens && !potatoBuckets)) {
      window.confirm('Veuillez entrer un nom et au moins un poulet ou un godet de pommes de terre');
      return;
    }
    if (name && chickens >= 0 && potatoBuckets >= 0) {
      onNewOrder({ name, chickens, potatoBuckets });
      setName('');
      setChickens(0);
      setPotatoBuckets(0);
      nameInputRef.current?.focus();
    }
  };

  return (
    <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
      <Box
        width="100%"
        bgcolor="turquoise"
        color="primary.contrastText"
        p={2}
        my={1}
        gap={1}
        border="1px solid darkTurquoise"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField
          label="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          inputProps={{ style: { fontSize: 20, height: 18 } }}
          sx={{ width: 150, bgcolor: 'white' }}
          inputRef={nameInputRef}
        />
        <Box display="flex" alignItems="center" gap={1} flex={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box component="img" src="chicken.png" alt="chicken" width={45} height={45} />
            <Typography variant="h5" width={30}>
              {chickens}
            </Typography>
          </Box>
          <IconButton onMouseDown={() => setChickens(chickens + 0.5)} sx={{ border: '1px solid black' }}>
            <AddIcon />
          </IconButton>
          <IconButton
            onMouseDown={() => setChickens(chickens - 0.5)}
            disabled={chickens <= 0}
            sx={{ border: '1px solid black' }}
          >
            <RemoveIcon />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" gap={1} flex={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box component="img" src="potato.png" alt="potato" width={45} height={45} />
            <Typography variant="h5" width={30}>
              {potatoBuckets}
            </Typography>
          </Box>
          <IconButton onMouseDown={() => setPotatoBuckets(potatoBuckets + 1)} sx={{ border: '1px solid black' }}>
            <AddIcon />
          </IconButton>
          <IconButton
            onMouseDown={() => setPotatoBuckets(potatoBuckets - 1)}
            disabled={potatoBuckets <= 0}
            sx={{ border: '1px solid black' }}
          >
            <RemoveIcon />
          </IconButton>
        </Box>
        <Typography align="right" variant="h5" width={55}>
          {Math.floor(chickens) * config.chickenPrice +
            (chickens - Math.floor(chickens)) * 2 * config.halfChickenPrice +
            potatoBuckets * config.potatoBucketPrice}
          €
        </Typography>
        <Button type="submit" variant="contained" sx={{ width: 100 }} onClick={handleSubmit}>
          Ajouter
        </Button>
      </Box>
    </Box>
  );
}
