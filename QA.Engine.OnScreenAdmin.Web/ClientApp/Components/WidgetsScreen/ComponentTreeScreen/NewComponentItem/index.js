import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import scrollToElement from 'scroll-to-element';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Tooltip from 'material-ui/Tooltip';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Widgets from 'material-ui-icons/Widgets';
import Unpublished from 'material-ui-icons/NewReleases';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import ZoneIcon from 'Components/Icons/Zone';
import ArticleIcon from 'material-ui-icons/Description';
// import Collapse from 'material-ui/transitions/Collapse';
import { deepPurple, red } from 'material-ui/colors';
import ComponentControlMenu from 'containers/WidgetsScreen/componentControlMenu';
import { MAX_COMPONENT_PRIMARY_TEXT_LENGTH } from 'constants/general';
import { ELEMENT_TYPE } from 'constants/elementTypes';

const componentCoords = PropTypes.shape({
  top: PropTypes.number,
  left: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
});

const widgetProperties = PropTypes.shape({
  widgetId: PropTypes.number.isRequired,
  widgetTypeUconSrc: PropTypes.string,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  componentCoords,
});

const zoneProperties = PropTypes.shape({
  zoneName: PropTypes.string.isRequired,
  isRecursive: PropTypes.bool.isRequired,
  isGlobal: PropTypes.bool.isRequired,
  componentCoords,
});

const articleProperties = PropTypes.shape({
  title: PropTypes.string,
});

const styles = theme => ({
  componentAvatar: {
    borderRadius: 0,
    color: 'inherit',
    width: theme.typography.pxToRem(30),
    height: theme.typography.pxToRem(30),
  },
  componentAvatarSelected: {
    borderRadius: 0,
    color: deepPurple[500],
    fontWeight: 'bold',
    width: theme.typography.pxToRem(30),
    height: theme.typography.pxToRem(30),
  },
  unpublishedOverlay: {
    width: theme.typography.pxToRem(25),
    height: theme.typography.pxToRem(25),
    marginLeft: '-10px',
    marginTop: '-20px',
    color: red[500],
  },
  listItem: {
    height: theme.typography.pxToRem(76.8),
  },
  listItemTextPrimary: {
    fontSize: theme.typography.pxToRem(20),
  },
  listItemTextRoot: {
    marginLeft: theme.spacing.unit * 2,
    // fontSize: theme.typography.pxToRem(24),
    justifyContent: 'flex-start',
  },
  listItemTextSelected: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 'bold',
    color: deepPurple[500],
  },
  listItemIconSelected: {
    color: deepPurple[500],
  },
  listItemSecondaryAction: {
    paddingRight: 80,
  },
  expandNodeIcon: {
    // width: theme.spacing.unit * 3,
    // height: theme.spacing.unit * 3,
  },
  expandNodeRoot: {
    verticalAlign: 'bottom',
  },
  tooltip: {
    fontSize: theme.typography.pxToRem(20),
  },
});

class NewComponentItem extends Component {
  static propTypes = {
    onToggleComponent: PropTypes.func.isRequired,
    onToggleFullSubtree: PropTypes.func.isRequired,
    onToggleSubtree: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    onScreenId: PropTypes.string.isRequired,
    isOpened: PropTypes.bool,
    selectedComponentId: PropTypes.string.isRequired,
    properties: PropTypes.oneOfType([widgetProperties, zoneProperties, articleProperties]).isRequired,
    hasChildren: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    isMovingWidget: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onMovingWidgetSelectTargetZone: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isOpened: false,
  };

  handleToggleClick = () => {
    const { isMovingWidget, onScreenId, onToggleComponent, onMovingWidgetSelectTargetZone } = this.props;

    if (isMovingWidget) {
      onMovingWidgetSelectTargetZone(onScreenId);
    } else {
      onToggleComponent(onScreenId);
      const outlineElem = document.querySelector(`.component--${onScreenId}`);
      if (outlineElem) {
        scrollToElement(`.component--${onScreenId}`,
          {
            offset: -100,
            ease: 'in-out-expo',
            duration: 1500,
          },
        );
      }
    }
  };

  handleOnScreenToggleClick = () => {
    this.handleToggleClick();
    this.props.onToggleFullSubtree(this.props.onScreenId);
  };

  handleSubtreeClick = () => {
    this.props.onToggleSubtree(this.props.onScreenId);
  };


  hasChildWidgets = (children) => {
    if (!children || children.length === 0) {
      return false;
    }

    return _.some(children, c => c.type === 'widget' || this.hasChildWidgets(c.children));
  };


  renderContextMenu = (isSelected) => {
    const { isMovingWidget } = this.props;
    if (!isSelected || isMovingWidget) {
      return null;
    }

    return (<ComponentControlMenu onScreenId={this.props.onScreenId} />);
  };

  renderListItemText = (primaryText, isSelected, classes) => (
    <ListItemText
      primary={primaryText}
      // disableTypography
      classes={{
        root: classes.listItemTextRoot,
        primary: isSelected ? classes.listItemTextSelected : classes.listItemTextPrimary,
      }}
    />
  );


  renderSecondaryText = (type, properties) => {
    if (type === 'zone') {
      let zoneSettings = '';
      if (properties.isRecursive) zoneSettings += ' recursive';
      if (properties.isGlobal) zoneSettings += ' global';

      return zoneSettings === '' ? 'zone' : `${type}:${zoneSettings}`;
    }

    return `${type}: ID - ${properties.widgetId}`;
  };


  renderListItemTextWrapper = (type, properties, isSelected, classes) => {
    let primaryText = '';
    switch (type) {
      case ELEMENT_TYPE.ZONE:
        primaryText = properties.zoneName;
        break;
      case ELEMENT_TYPE.WIDGET:
        primaryText = `#${properties.widgetId} ${properties.title}`;
        break;
      case ELEMENT_TYPE.ARTICLE:
        primaryText = `#${properties.articleId} ${properties.title}`;
        break;
      default:
        break;
    }

    const isPrimaryTextTruncated = primaryText.length > MAX_COMPONENT_PRIMARY_TEXT_LENGTH;
    const textToRender = isPrimaryTextTruncated
      ? `${primaryText.substring(0, MAX_COMPONENT_PRIMARY_TEXT_LENGTH)}…`
      : primaryText;

    return (
      <Tooltip
        title={isPrimaryTextTruncated ? primaryText : ''}
        classes={{ tooltip: classes.tooltip }}
        disableTriggerFocus={!isPrimaryTextTruncated}
        disableTriggerHover={!isPrimaryTextTruncated}
        disableTriggerTouch={!isPrimaryTextTruncated}
      >
        {this.renderListItemText(textToRender, isSelected, classes)}
      </Tooltip>
    );
  };


  renderCollapseButton = (isOpened, hasChildren, classes) => {
    if (!hasChildren) {
      return null;
    }

    return (
      <IconButton
        onClick={this.handleSubtreeClick}
        classes={{ root: classes.expandNodeRoot }}
      >
        <Icon classes={{ root: classes.expandNodeIcon }}>
          {isOpened ? <ExpandLess /> : <ExpandMore />}
        </Icon>
      </IconButton>
    );
  };

  renderListItemIcon = (type, properties, isSelected, classes) => {
    const className = isSelected ? classes.componentAvatarSelected : classes.componentAvatar;

    switch (type) {
      case ELEMENT_TYPE.ZONE:
        return (
          <ZoneIcon className={className} />
        );
      case ELEMENT_TYPE.WIDGET:
        if (properties.widgetTypeIconSrc) {
          return (
            <Fragment>
              {properties.widgetTypeIconSrc
                ? (<Avatar className={className} src={properties.widgetTypeIconSrc} />)
                : (<Avatar className={className}><Widgets /></Avatar>)
              }
              {!properties.published && (<Unpublished className={classes.unpublishedOverlay} />)}
            </Fragment>
          );
        }
        return (<Avatar className={className}><Widgets /></Avatar>);
      case ELEMENT_TYPE.ARTICLE:
        return (<Fragment>
          <Avatar className={className}><ArticleIcon className={className} /></Avatar>
          {!properties.published && (<Unpublished className={classes.unpublishedOverlay} />)}
        </Fragment>);
      default:
        return null;
    }
  };

  renderListItem = () => {
    const {
      onScreenId,
      properties,
      selectedComponentId,
      classes,
      isOpened,
      isDisabled,
      type,
      hasChildren,
    } = this.props;

    const isSelected = selectedComponentId === onScreenId;

    return (
      <ListItem
        disabled={isDisabled}
        classes={{
          root: classes.listItem,
          secondaryAction: classes.listItemSecondaryAction,
        }}
        // style={{ paddingLeft: itemLevel > 1 ? `${itemLevel * 1}em` : '16px' }}
        onClick={this.handleToggleClick}
        ContainerComponent={'div'}
        button
      >
        {this.renderListItemIcon(type, properties, isSelected, classes)}
        {this.renderListItemTextWrapper(type, properties, isSelected, classes)}
        <ListItemSecondaryAction>
          {this.renderContextMenu(isSelected)}
          {this.renderCollapseButton(isOpened, hasChildren, classes)}
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  render() {
    return (
      <Fragment>
        {this.renderListItem()}
      </Fragment>
    );
  }
}


export default withStyles(styles)(NewComponentItem);
