import { connect } from 'react-redux';
import { toggleAllWidgets, toggleAllZones, toggleZonesTitles } from 'actions/componentHighlightActions';
import { getShowAllZones, getShowAllWidgets, getShowZonesTitles } from 'selectors/componentsHighlight';
import { getEnabledMenuKeys } from 'selectors/globalContextMenu';
import { getShowOnlyWidgetsSelector } from 'selectors/componentTree';
import { beginWidgetCreation } from 'actions/widgetCreation/actions';
import editPage from 'actions/editPage';
import { WIDGET_CREATION_MODE } from 'constants/widgetCreation';
import GlobalActions from 'Components/Sidebar/GlobalActions';
import checkIsIframe from 'utils/checkIsIframe';
import { toggleShowOnlyWidgets } from '../actions/componentTree/actions';


const mapStateToProps = state => ({
  isIframe: checkIsIframe(),
  showOnlyWidgets: getShowOnlyWidgetsSelector(state),
  showAllZones: getShowAllZones(state),
  showAllWidgets: getShowAllWidgets(state),
  showZonesTitles: getShowZonesTitles(state),
  enabledMenuKeys: getEnabledMenuKeys(state),
});

const mapDispatchToProps = dispatch => ({
  toggleAllZones: () => {
    dispatch(toggleAllZones());
  },
  toggleAllWidgets: () => {
    dispatch(toggleAllWidgets());
  },
  toggleZonesTitles: () => {
    dispatch(toggleZonesTitles());
  },
  addWidgetToPage: () => {
    const payload = {
      creationMode: WIDGET_CREATION_MODE.PAGE_CHILD,
    };
    dispatch(beginWidgetCreation(payload));
  },
  toggleShowOnlyWidgets: () => {
    dispatch(toggleShowOnlyWidgets());
  },
  editPage: (currentPageId) => {
    dispatch(editPage(currentPageId));
  },
});

const GlobalActionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalActions);

export default GlobalActionsContainer;

