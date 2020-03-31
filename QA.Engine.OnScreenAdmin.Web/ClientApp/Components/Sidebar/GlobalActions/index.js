import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ToggleButtons from './ToggleButtons';
import GlobalContextMenu from './GlobalContextMenu';


const GlobalActions = (props) => {
  const {
    isIframe,
    showOnlyWidgets,
    showAllZones,
    showAllWidgets,
    showZonesTitles,
    toggleAllZones,
    toggleAllWidgets,
    toggleZonesTitles,
    enabledMenuKeys,
    addWidgetToPage,
    toggleShowOnlyWidgets,
    editPage,
  } = props;

  return (
    <Fragment>
      <GlobalContextMenu
        enabledMenuKeys={enabledMenuKeys}
        addWidgetToPage={addWidgetToPage}
        toggleShowOnlyWidgets={toggleShowOnlyWidgets}
        showOnlyWidgets={showOnlyWidgets}
        isIframe={isIframe}
        editPage={editPage}
      />
      <ToggleButtons
        showOnlyWidgets={showOnlyWidgets}
        showAllWidgets={showAllWidgets}
        showAllZones={showAllZones}
        showZonesTitles={showZonesTitles}
        toggleAllWidgets={toggleAllWidgets}
        toggleAllZones={toggleAllZones}
        toggleZonesTitles={toggleZonesTitles}
      />
    </Fragment>
  );
};

GlobalActions.propTypes = {
  isIframe: PropTypes.bool.isRequired,
  showOnlyWidgets: PropTypes.bool.isRequired,
  showAllZones: PropTypes.bool.isRequired,
  showAllWidgets: PropTypes.bool.isRequired,
  showZonesTitles: PropTypes.bool.isRequired,
  toggleAllZones: PropTypes.func.isRequired,
  toggleAllWidgets: PropTypes.func.isRequired,
  toggleZonesTitles: PropTypes.func.isRequired,
  enabledMenuKeys: PropTypes.array.isRequired,
  addWidgetToPage: PropTypes.func.isRequired,
  toggleShowOnlyWidgets: PropTypes.func.isRequired,
  editPage: PropTypes.func.isRequired,
};

export default GlobalActions;

