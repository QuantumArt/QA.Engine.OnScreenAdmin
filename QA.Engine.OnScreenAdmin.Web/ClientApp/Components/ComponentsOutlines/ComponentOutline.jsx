import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import { Settings } from 'material-ui-icons';
import ComponentControlMenuContainer from '../../containers/WidgetsScreen/componentControlMenu';
import { ELEMENT_TYPE } from '../../constants/elementTypes';

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
    position: 'absolute',
    fontSize: '14px',
    fontStyle: 'italic',
  },
  zoneName: {
    top: 0,
    left: 0,
  },
  widgetName: {
    top: 0,
    right: '22px',
  },
  articleName: {
    top: 0,
    right: '22px',
  },
  editButton: {
    top: 0,
    right: 0,
    position: 'absolute',
    outline: 'none',
  },
});

class ComponentOutline extends React.Component {
  state = {
    anchorEl: null,
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  handleSettingsClick = (event) => {
    const { onSelectComponent, component } = this.props;
    this.setState({ anchorEl: event.currentTarget });
    onSelectComponent(component.onScreenId);
  };

  renderSettingsButton(classes, component) {
    return (<React.Fragment>
      <i
        tabIndex={0}
        role="button"
        onClick={(e) => {
          e.stopPropagation();
          this.handleSettingsClick(e);
        }}
        className={classes.editButton}
      >
        <Settings style={{ fontSize: 20 }} />
      </i>
      <ComponentControlMenuContainer
        onScreenId={component.onScreenId}
        renderMenuButton={false}
        anchorEl={this.state.anchorEl}
        onMenuClose={this.handleCloseMenu}
      />
    </React.Fragment>);
  }

  render() {
    const {
      showAllZones,
      showAllWidgets,
      showZonesTitles,
      coords,
      component,
      classes,
      onSelectComponent,
    } = this.props;
    let color = null;
    if (component.type === 'zone') {
      color = '#66bb6a';
    } else if (component.type === 'widget') {
      color = '#29b6f6';
    } else if (component.type === 'article') {
      color = '#ff9900';
    }

    let itemInlineStyles = {
      top: `${coords.top}px`,
      left: `${coords.left}px`,
      width: `${coords.width}px`,
      height: `${coords.height}px`,
      borderColor: color,
    };

    if (component.isSelected || (showAllZones && component.type === 'zone') || (showAllWidgets && component.type === 'widget')) {
      itemInlineStyles = {
        ...itemInlineStyles,
        borderStyle: 'dashed',
      };
    }

    const nameInlineStyles = {
      background: color, color: '#ffffff',
    };


    let highlightedInlineStyles = null;
    if (component.isSelected || (component.type === ELEMENT_TYPE.ZONE && showZonesTitles)) {
      highlightedInlineStyles = {
        opacity: '1',
      };
    }


    return (
      <div
        tabIndex={0}
        role="button"
        onClick={() => onSelectComponent(component.onScreenId)}
        className={`${classes.highlightsItem} component--${component.onScreenId}`}
        style={itemInlineStyles}
      >
        {component.type === ELEMENT_TYPE.WIDGET && (
          <div className={classes.highlightsBody} style={highlightedInlineStyles}>
            <span className={classNames(classes.componentName, classes.widgetName)} style={nameInlineStyles}>
              {component.properties.title}
            </span>
            {this.renderSettingsButton(classes, component)}
          </div>
        )}
        {(component.type === ELEMENT_TYPE.ZONE) && (
          <div className={classes.highlightsBody} style={highlightedInlineStyles}>
            <span className={classNames(classes.componentName, classes.zoneName)} style={nameInlineStyles}>
              {component.properties.zoneName}
            </span>
          </div>
        )}
        {(component.type === ELEMENT_TYPE.ARTICLE) && (
          <div className={classes.highlightsBody} style={highlightedInlineStyles}>
            <span className={classNames(classes.componentName, classes.articleName)} style={nameInlineStyles}>
              {component.properties.title}
            </span>
            {this.renderSettingsButton(classes, component)}
          </div>
        )}
      </div>
    );
  }
}

ComponentOutline.propTypes = {
  showAllZones: PropTypes.bool.isRequired,
  showAllWidgets: PropTypes.bool.isRequired,
  showZonesTitles: PropTypes.bool.isRequired,
  coords: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onSelectComponent: PropTypes.func.isRequired,
};


export default withStyles(styles)(ComponentOutline);
