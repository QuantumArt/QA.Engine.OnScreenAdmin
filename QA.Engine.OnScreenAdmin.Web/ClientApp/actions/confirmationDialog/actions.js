import { CONFIRMATION_DIALOG_CANCELLED, CONFIRMATION_DIALOG_CONFIRMED, CONFIRMATION_DIALOG_SHOW } from './actionTypes';

export function showConfirmationDialog(dialogId, title, text, confirmText, cancelText, disableBackdropClick = false) {
  return {
    type: CONFIRMATION_DIALOG_SHOW,
    payload: {
      dialogId,
      title,
      text,
      confirmText,
      cancelText,
      disableBackdropClick,
    },
  };
}

export function confirmationDialogConfirm(dialogId) {
  return {
    type: CONFIRMATION_DIALOG_CONFIRMED,
    payload: {
      dialogId,
    },
  };
}

export function confirmationDialogCancel(dialogId) {
  return {
    type: CONFIRMATION_DIALOG_CANCELLED,
    payload: {
      dialogId,
    },
  };
}
