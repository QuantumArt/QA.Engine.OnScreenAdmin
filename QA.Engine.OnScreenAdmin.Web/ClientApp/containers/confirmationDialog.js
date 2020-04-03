import { connect } from 'react-redux';
import ConfirmationDialog from 'Components/ConfirmationDialog';
import {
  confirmationDialogCancel,
  confirmationDialogConfirm,
} from 'actions/confirmationDialog/actions';

const mapStateToProps = state => ({
  open: state.confirmationDialog.open,
  title: state.confirmationDialog.title,
  text: state.confirmationDialog.text,
  cancelText: state.confirmationDialog.cancelText,
  confirmText: state.confirmationDialog.confirmText,
  disableBackdropClick: state.confirmationDialog.disableBackdropClick,
  dialogId: state.confirmationDialog.dialogId,
});

const mapDispatchToProps = dispatch => ({
  onCancel: (dialogId) => {
    dispatch(confirmationDialogCancel(dialogId));
  },
  onConfirm: (dialogId) => {
    dispatch(confirmationDialogConfirm(dialogId));
  },

});

const ConfirmationDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmationDialog);

export default ConfirmationDialogContainer;
