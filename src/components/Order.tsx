import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ConfigType } from '../types';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useConfirmation, useNotification } from '../hooks/useDialog';
import ConfirmDialog from './ConfirmDialog';
import Notification from './Notification';

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
  const { confirmState, confirm, handleCancel } = useConfirmation();
  const { notificationState, notify, handleClose } = useNotification();

  return (
    <Box width="100%" display="flex" alignItems="center">
      <Box
        width="100%"
        bgcolor={delivered ? 'lightblue' : 'primary.light'}
        color="primary.contrastText"
        p={2}
        my={1}
        gap={1}
        border={delivered ? '1px solid #42a5f5' : '1px solid #1976d2'}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4" width={150}>
          {name}
        </Typography>
        <Box display="flex" alignItems="center" gap={2} flex={1}>
          <Box component="img" src="chicken.png" alt="chicken" width={45} height={45} />
          <Typography variant="h5">{chickens}</Typography>{' '}
        </Box>
        <Box display="flex" alignItems="center" gap={2} flex={1}>
          <Box component="img" src="potato.png" alt="potato" width={45} height={45} />
          <Typography variant="h5">{potatoBuckets}</Typography>{' '}
        </Box>
        <Typography variant="h5" align="right" width={55}>
          {Math.floor(chickens) * config.chickenPrice +
            (chickens - Math.floor(chickens)) * 2 * config.halfChickenPrice +
            potatoBuckets * config.potatoBucketPrice}
          €
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1} flex={1}>
          {delivered ? (
            <Box width={45}></Box>
          ) : (
            <IconButton
              color="error"
              onClick={async () => {
                if (config.confirmDelete) {
                  const confirmed = await confirm({
                    title: 'Supprimer la commande',
                    message: `Êtes-vous sûr de vouloir supprimer la commande de ${name} ?`,
                    confirmText: 'Supprimer',
                    cancelText: 'Annuler',
                    severity: 'error',
                  });
                  if (confirmed) {
                    handleRemove(id);
                  }
                } else {
                  handleRemove(id);
                }
              }}
              sx={{ width: 45 }}
            >
              <DeleteForeverIcon />
            </IconButton>
          )}
          <Button
            variant="contained"
            onClick={() => {
              onDelivered(id);
              notify({
                message: `Commande de ${name} ${delivered ? 'remise en attente' : 'marquée comme livrée'}`,
                severity: 'success',
              });
            }}
            sx={{ width: 100 }}
          >
            {delivered ? 'Relivrer' : 'Livrer'}
          </Button>
        </Box>
      </Box>
      <ConfirmDialog
        open={confirmState.open}
        title={confirmState.options.title}
        message={confirmState.options.message}
        onConfirm={confirmState.onConfirm || (() => {})}
        onCancel={handleCancel}
        confirmText={confirmState.options.confirmText}
        cancelText={confirmState.options.cancelText}
        severity={confirmState.options.severity}
      />
      <Notification
        open={notificationState.open}
        message={notificationState.options.message}
        severity={notificationState.options.severity}
        onClose={handleClose}
        autoHideDuration={notificationState.options.autoHideDuration}
      />
    </Box>
  );
}
