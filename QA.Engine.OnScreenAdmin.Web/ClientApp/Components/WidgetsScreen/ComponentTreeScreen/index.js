import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import NewComponentTree from 'containers/WidgetsScreen/ComponentTreeScreen/newComponentTree';
import HeaderWithSearchButton from 'Components/WidgetsScreen/HeaderWithSearchButton';
import ComponentTreeSearch from 'containers/WidgetsScreen/ComponentTreeScreen/componentTreeSearch';

const ComponentTreeScreen = ({ showOnlyWidgets, showSearchBox, toggleSearchBoxVisibility }) => (
  <Fragment>
    <HeaderWithSearchButton
      text={showOnlyWidgets ? 'Widgets structure' : 'Widgets and zones structure'}
      showSearchButton
      searchButtonClick={toggleSearchBoxVisibility}
    />
    {showSearchBox &&
      <ComponentTreeSearch />
    }
    <NewComponentTree />
  </Fragment>
);

ComponentTreeScreen.propTypes = {
  showSearchBox: PropTypes.bool.isRequired,
  showOnlyWidgets: PropTypes.bool.isRequired,
  toggleSearchBoxVisibility: PropTypes.func.isRequired,

};

export default ComponentTreeScreen;
