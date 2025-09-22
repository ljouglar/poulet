import { renderHook, act } from '@testing-library/react';
import { useConfirmation, useNotification } from '../hooks/useDialog';

describe('useConfirmation', () => {
  it('should initialize with closed state', () => {
    const { result } = renderHook(() => useConfirmation());

    expect(result.current.confirmState.open).toBe(false);
    expect(result.current.confirmState.options.title).toBe('');
    expect(result.current.confirmState.options.message).toBe('');
  });

  it('should open confirmation dialog with provided options', async () => {
    const { result } = renderHook(() => useConfirmation());

    const options = {
      title: 'Test Title',
      message: 'Test Message',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      severity: 'warning' as const,
    };

    act(() => {
      result.current.confirm(options);
    });

    expect(result.current.confirmState.open).toBe(true);
    expect(result.current.confirmState.options.title).toBe('Test Title');
    expect(result.current.confirmState.options.message).toBe('Test Message');
    expect(result.current.confirmState.options.confirmText).toBe('Confirm');
    expect(result.current.confirmState.options.cancelText).toBe('Cancel');
    expect(result.current.confirmState.options.severity).toBe('warning');
  });

  it('should resolve with true when confirmed', async () => {
    const { result } = renderHook(() => useConfirmation());

    const options = {
      title: 'Test',
      message: 'Test message',
    };

    let confirmPromise: Promise<boolean>;

    act(() => {
      confirmPromise = result.current.confirm(options);
    });

    expect(result.current.confirmState.open).toBe(true);

    // Simulate confirm action
    act(() => {
      if (result.current.confirmState.onConfirm) {
        result.current.confirmState.onConfirm();
      }
    });

    expect(result.current.confirmState.open).toBe(false);

    const resolvedValue = await confirmPromise!;
    expect(resolvedValue).toBe(true);
  });

  it('should close dialog when cancelled', () => {
    const { result } = renderHook(() => useConfirmation());

    const options = {
      title: 'Test',
      message: 'Test message',
    };

    act(() => {
      result.current.confirm(options);
    });

    expect(result.current.confirmState.open).toBe(true);

    act(() => {
      result.current.handleCancel();
    });

    expect(result.current.confirmState.open).toBe(false);
  });
});

describe('useNotification', () => {
  it('should initialize with closed state', () => {
    const { result } = renderHook(() => useNotification());

    expect(result.current.notificationState.open).toBe(false);
    expect(result.current.notificationState.options.message).toBe('');
    expect(result.current.notificationState.options.severity).toBe('info');
  });

  it('should open notification with provided options', () => {
    const { result } = renderHook(() => useNotification());

    const options = {
      message: 'Test notification',
      severity: 'success' as const,
      autoHideDuration: 5000,
    };

    act(() => {
      result.current.notify(options);
    });

    expect(result.current.notificationState.open).toBe(true);
    expect(result.current.notificationState.options.message).toBe('Test notification');
    expect(result.current.notificationState.options.severity).toBe('success');
    expect(result.current.notificationState.options.autoHideDuration).toBe(5000);
  });

  it('should close notification when handleClose is called', () => {
    const { result } = renderHook(() => useNotification());

    const options = {
      message: 'Test notification',
      severity: 'info' as const,
    };

    act(() => {
      result.current.notify(options);
    });

    expect(result.current.notificationState.open).toBe(true);

    act(() => {
      result.current.handleClose();
    });

    expect(result.current.notificationState.open).toBe(false);
  });

  it('should handle all severity types', () => {
    const { result } = renderHook(() => useNotification());

    const severityTypes = ['error', 'warning', 'info', 'success'] as const;

    severityTypes.forEach((severity) => {
      act(() => {
        result.current.notify({
          message: `Test ${severity}`,
          severity,
        });
      });

      expect(result.current.notificationState.options.severity).toBe(severity);
      expect(result.current.notificationState.options.message).toBe(`Test ${severity}`);
    });
  });
});
