import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from '../actions/notifications/actionTypes';

const initialState = {
  open: false,
  message: '',
  autohideDuration: null,
  showCloseButton: true,
  vertical: 'top',
  horizontal: 'center',
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        open: true,
        message: action.payload.message,
        autohideDuration: action.payload.autohideDuration,
        showCloseButton: action.payload.showCloseButton,
      };
    case HIDE_NOTIFICATION: {
      return initialState;
    }
    default:
      return state;
  }
}
