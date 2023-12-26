import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ConfigType } from './types';

interface OrderProps {
  order: {
    id: number;
    name: string;
    chickens: number;
    potatoBuckets: number;
    delivered: boolean;
  };
  onDelivered: (id: number) => void;
  handleRemove: (id: number) => void;
  config: ConfigType;
}

export default function Order({ order, onDelivered, handleRemove, config }: OrderProps) {
  const { id, name, chickens, potatoBuckets, delivered } = order;

  return (
    <Box width="100%" display="flex" alignItems="center">
      <Box
        width="100%"
        bgcolor={delivered ? 'lightblue' : 'primary.light'}
        color="primary.contrastText"
        p={2}
        my={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4" sx={{ flex: 1 }}>
          {name}
        </Typography>
        <Box display="flex" alignItems="center" sx={{ gap: 2, flex: 1 }}>
          <Box component="img" src="chicken.png" alt="chicken" sx={{ width: 50, height: 50 }} />
          <Typography variant="h5">{chickens}</Typography>{' '}
        </Box>
        <Box display="flex" alignItems="center" sx={{ gap: 2, flex: 1 }}>
          <Box component="img" src="potato.png" alt="potato" sx={{ width: 50, height: 50 }} />
          <Typography variant="h5">{potatoBuckets}</Typography>{' '}
        </Box>
        <Typography variant="h5" sx={{ flex: 1 }}>
          {Math.floor(chickens) * config.chickenPrice +
            (chickens - Math.floor(chickens)) * 2 * config.halfChickenPrice +
            potatoBuckets * config.potatoBucketPrice}
          €
        </Typography>
          <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ gap: 2, flex: 1 }}>
          {delivered ? (
        <></>
        ) : (
            <Button
              variant="contained"
              color="warning"
              sx={{ width: 130 }}
              onClick={() => {
                if (window.confirm('Êtes-vous sûr de vouloir supprimer la commande ?')) {
                  handleRemove(id);
                }
              }}
            >
              Supprimer
            </Button>
        )}
          </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ gap: 2, flex: 1 }}>
          <Button variant="contained" onClick={() => onDelivered(id)} sx={{ width: 130 }}>
            {delivered ? 'Relivrer' : 'Livrer'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
