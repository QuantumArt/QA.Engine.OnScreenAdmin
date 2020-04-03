import { combineReducers } from 'redux';
import sidebar from './sidebarReducer';
import componentTree from './componentTreeReducer';
import metaInfo from './metaInfoReducer';
import widgetsScreen from './widgetsScreenReducer';
import componentsHighlight from './componentsHighlightReducer';
import availableWidgets from './availableWidgetsReducer';
import articleManagement from './articleManagementReducer';
import abTestingScreen from './abTestingScreenReducer';
import widgetCreation from './widgetCreationWizardReducer';
import notification from './notificatonReducer';
import confirmationDialog from './confirmationDialogReducer';

const rootReducer = combineReducers({
  sidebar,
  componentTree,
  metaInfo,
  widgetsScreen,
  abTestingScreen,
  componentsHighlight,
  availableWidgets,
  articleManagement,
  widgetCreation,
  notification,
  confirmationDialog,
});

export default rootReducer;
