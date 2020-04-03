import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from './actionTypes';

export function showNotification(message, autohideDuration, showCloseButton) {
  return { type: SHOW_NOTIFICATION, payload: { message, autohideDuration, showCloseButton } };
}

export function hideNotification() {
  return { type: HIDE_NOTIFICATION };
}
