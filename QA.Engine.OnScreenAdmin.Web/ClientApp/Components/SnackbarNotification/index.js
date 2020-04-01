import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit,
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

const SnackbarNotification = ({
  open,
  vertical,
  horizontal,
  message,
  autohideDuration,
  showCloseButton,
  onClose,
  classes }) => (
    <Snackbar
    anchorOrigin={{ vertical, horizontal }}
    open={open}
    autoHideDuration={autohideDuration}
    onClose={onClose}
    message={<span>{message}</span>}
    action={!showCloseButton
      ? []
      : [<IconButton
        key={close}
        color="inherit"
        className={classes.close}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>]}
  />);

SnackbarNotification.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  vertical: PropTypes.oneOf(['top', 'center', 'bottom']),
  horizontal: PropTypes.oneOf(['left, center, right']),
  message: PropTypes.string.isRequired,
  autohideDuration: PropTypes.number,
  showCloseButton: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

SnackbarNotification.defaultProps = {
  vertical: 'top',
  horizontal: 'center',
  autohideDuration: null,
  showCloseButton: true,
};

export default withStyles(styles)(SnackbarNotification);
