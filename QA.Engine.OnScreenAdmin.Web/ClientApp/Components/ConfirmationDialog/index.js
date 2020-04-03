import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    fontSize: theme.typography.pxToRem(20),
  },
});


const ConfirmationDialog = ({
  open,
  disableBackdropClick,
  onCancel,
  onConfirm,
  title,
  text,
  cancelText,
  confirmText,
  classes,
  dialogId,
}) =>
  (<div>
    <Dialog
      open={open}
      onClose={() => onCancel(dialogId)}
      disableBackdropClick={disableBackdropClick}
      classes={{ root: classes.root }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onCancel(dialogId)} color="primary">{cancelText}</Button>
        <Button onClick={() => onConfirm(dialogId)} color="primary">{confirmText}</Button>
      </DialogActions>
    </Dialog>
  </div>);

ConfirmationDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  disableBackdropClick: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  dialogId: PropTypes.string.isRequired,
};

export default withStyles(styles)(ConfirmationDialog);
