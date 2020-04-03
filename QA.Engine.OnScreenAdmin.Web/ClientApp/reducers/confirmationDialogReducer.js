import {
  CONFIRMATION_DIALOG_CANCELLED,
  CONFIRMATION_DIALOG_CONFIRMED,
  CONFIRMATION_DIALOG_SHOW,
} from 'actions/confirmationDialog/actionTypes';

const initialState = {
  open: false,
  dialogId: '',
  title: '',
  text: '',
  confirmText: '',
  cancelText: '',
  disableBackdropClick: false,
};

export default function confirmationDialogReducer(state = initialState, action) {
  switch (action.type) {
    case CONFIRMATION_DIALOG_SHOW:
      return {
        ...state,
        open: true,
        dialogId: action.payload.dialogId,
        title: action.payload.title,
        text: action.payload.text,
        confirmText: action.payload.confirmText,
        cancelText: action.payload.cancelText,
        disableBackdropClick: action.payload.disableBackdropClick,
      };
    case CONFIRMATION_DIALOG_CANCELLED:
      return {
        ...state,
        ...initialState,
      };
    case CONFIRMATION_DIALOG_CONFIRMED:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
