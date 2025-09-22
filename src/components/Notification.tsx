import { Alert, Snackbar } from '@mui/material';

interface NotificationProps {
  open: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  onClose: () => void;
  autoHideDuration?: number;
}

export default function Notification({ open, message, severity, onClose, autoHideDuration = 4000 }: NotificationProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
