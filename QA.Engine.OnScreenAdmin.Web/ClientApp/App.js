import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import CssBaseline from 'material-ui/CssBaseline';
import Sidebar from './containers/sidebar';
import SnackbarNotificationContainer from './containers/snackbarNotification';

const App = ({ store, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CssBaseline />
      <Sidebar />
      <SnackbarNotificationContainer />
    </PersistGate>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  persistor: PropTypes.object.isRequired,
};

export default App;
