import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  highlightsItem: {
    'position': 'absolute',
    'outline': 'none',
    'borderStyle': 'hidden',
    'borderWidth': '2px',
    '&:hover': {
      borderStyle: 'dashed',
    },
  },
});

function ComponentOutline({ showAllZones, showAllWidgets, coords, component, classes }) {
  let inlineStyles = {
    top: `${coords.top}px`,
    left: `${coords.left}px`,
    width: `${coords.width}px`,
    height: `${coords.height}px`,
    borderColor: component.type === 'widget' ? '#29b6f6' : '#66bb6a',
  };

  if (component.isSelected || (showAllZones && component.type === 'zone') || (showAllWidgets && component.type === 'widget')) {
    inlineStyles = {
      ...inlineStyles,
      borderStyle: 'dashed',
    };
  }

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={() => console.log(`Добавить обработку выбора элемента: ${component.type} ${component.onScreenId}`)}
      className={`${classes.highlightsItem} component--${component.onScreenId}`}
      style={inlineStyles}
    />
  );
}

ComponentOutline.propTypes = {
  showAllZones: PropTypes.bool.isRequired,
  showAllWidgets: PropTypes.bool.isRequired,
  coords: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComponentOutline);
