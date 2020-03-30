import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import { Settings } from 'material-ui-icons';

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
  highlightsBody: {
    'height': '100%',
    'width': '100%',
    'position': 'relative',
    'opacity': '0',
    'transition': 'opacity 0.3s',
    '&:hover': {
      opacity: '1',
    },
  },
  componentName: {
    top: 0,
    right: '22px',
    position: 'absolute',
    fontSize: '14px',
    fontStyle: 'italic',
  },
  editButton: {
    top: 0,
    right: 0,
    position: 'absolute',
    outline: 'none',
  },
});

function ComponentOutline({ showAllZones, showAllWidgets, coords, component, classes, onSelectComponent }) {
  let color = null;
  if (component.type === 'zone') {
    color = '#66bb6a';
  } else if (component.type === 'widget') {
    color = '#29b6f6';
  } else if (component.type === 'article') {
    color = '#ff9900';
  }

  let inlineStyles = {
    top: `${coords.top}px`,
    left: `${coords.left}px`,
    width: `${coords.width}px`,
    height: `${coords.height}px`,
    borderColor: color,
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
      onClick={() => onSelectComponent(component.onScreenId)}
      className={`${classes.highlightsItem} component--${component.onScreenId}`}
      style={inlineStyles}
    >
      {component.type === 'widget' && (
        <div className={classes.highlightsBody}>
          <span className={classes.componentName}>{component.properties.title}</span>
          <i
            tabIndex={0}
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              console.log(`Добавить обработку редактирования ${component.type} ${component.onScreenId}`);
            }}
            className={classes.editButton}
          >
            <Settings style={{ fontSize: 20 }} />
          </i>
        </div>
      )}
      {(component.type === 'zone') && (
        <div className={classes.highlightsBody}>
          <span className={classes.componentName}>{component.properties.zoneName}</span>
        </div>
      )}
    </div >
  );
}

ComponentOutline.propTypes = {
  showAllZones: PropTypes.bool.isRequired,
  showAllWidgets: PropTypes.bool.isRequired,
  coords: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onSelectComponent: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComponentOutline);
