import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import AvailableWidget from '../AvailableWidget';

const AvailableWidgetsList = ({ availableWidgets, onSelectWidget }) => (
  <Fragment>

    <List>
      {availableWidgets.map(widget => (
        <AvailableWidget
          {...widget}
          key={widget.id}
          onSelectWidget={onSelectWidget}
        />
      ))}
    </List>
  </Fragment>
);


AvailableWidgetsList.propTypes = {
  availableWidgets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      discriminator: PropTypes.string.isRequired,
      typeName: PropTypes.string.isRequired,
      isPage: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      icon: PropTypes.shape({
        iconUrl: PropTypes.string,
        iconClass: PropTypes.string,
        iconIntent: PropTypes.string,
      }),
    }).isRequired,
  ),
  onSelectWidget: PropTypes.func.isRequired,
};

AvailableWidgetsList.defaultProps = {
  availableWidgets: null,
};

export default AvailableWidgetsList;
