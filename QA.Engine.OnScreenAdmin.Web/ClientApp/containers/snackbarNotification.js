import { connect } from 'react-redux';
import { hideNotification } from '../actions/notifications/actions';
import SnackbarNotification from '../Components/SnackbarNotification';


const mapStateToProps = state => ({
  open: state.notification.open,
  vertical: state.notification.vertical,
  horizontal: state.notification.horizontal,
  message: state.notification.message,
  autohideDuration: state.notification.autohideDuration,
  showCloseButton: state.notification.showCloseButton,

});

const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(hideNotification());
  },
});

const SnackbarNotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SnackbarNotification);

export default SnackbarNotificationContainer;
