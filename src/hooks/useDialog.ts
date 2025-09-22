import { useState } from 'react';

interface ConfirmationOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  severity?: 'info' | 'warning' | 'error';
}

interface NotificationOptions {
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  autoHideDuration?: number;
}

export function useConfirmation() {
  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    options: ConfirmationOptions;
    onConfirm?: () => void;
  }>({
    open: false,
    options: { title: '', message: '' },
  });

  const confirm = (options: ConfirmationOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmState({
        open: true,
        options,
        onConfirm: () => {
          setConfirmState((prev) => ({ ...prev, open: false }));
          resolve(true);
        },
      });
    });
  };

  const handleCancel = () => {
    setConfirmState((prev) => ({ ...prev, open: false }));
  };

  return {
    confirmState,
    confirm,
    handleCancel,
  };
}

export function useNotification() {
  const [notificationState, setNotificationState] = useState<{
    open: boolean;
    options: NotificationOptions;
  }>({
    open: false,
    options: { message: '', severity: 'info' },
  });

  const notify = (options: NotificationOptions) => {
    setNotificationState({
      open: true,
      options,
    });
  };

  const handleClose = () => {
    setNotificationState((prev) => ({ ...prev, open: false }));
  };

  return {
    notificationState,
    notify,
    handleClose,
  };
}
