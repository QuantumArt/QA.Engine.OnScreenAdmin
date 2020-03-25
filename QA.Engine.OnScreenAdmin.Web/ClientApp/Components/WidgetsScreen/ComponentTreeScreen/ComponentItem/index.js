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
import { deepPurple, red } from 'material-ui/colors';
import ComponentControlMenu from 'containers/WidgetsScreen/componentControlMenu';
import { MAX_COMPONENT_PRIMARY_TEXT_LENGTH } from 'constants/general';
import { ELEMENT_TYPE } from 'constants/elementTypes';


const treeItemDataProps = PropTypes.shape({
  onScreenId: PropTypes.string.isRequired,
  type: PropTypes.oneOf([ELEMENT_TYPE.WIDGET, ELEMENT_TYPE.ZONE, ELEMENT_TYPE.ARTICLE]).isRequired,
  primaryText: PropTypes.string.isRequired,
  iconSrc: PropTypes.string,
  isDisabled: PropTypes.bool,
});

const treeItemProps = PropTypes.shape({
  id: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasChildren: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  data: PropTypes.objectOf(treeItemDataProps),
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

class ComponentItem extends Component {
  static propTypes = {
    treeItem: PropTypes.objectOf(treeItemProps).isRequired,
    onToggleComponent: PropTypes.func.isRequired,
    onToggleFullSubtree: PropTypes.func.isRequired,
    onToggleSubtree: PropTypes.func.isRequired,
    onMovingWidgetSelectTargetZone: PropTypes.func.isRequired,
    selectedComponentId: PropTypes.string.isRequired,
    isMovingWidget: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,


  };

  static defaultProps = {
    isOpened: false,
  };

  handleToggleClick = () => {
    const {
      isMovingWidget,
      onToggleComponent,
      onMovingWidgetSelectTargetZone,
      treeItem: { data: { onScreenId } },
    } = this.props;

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
    const { treeItem: { data: { onScreenId } } } = this.props;
    this.handleToggleClick();
    this.props.onToggleFullSubtree(onScreenId);
  };

  handleSubtreeClick = () => {
    const { treeItem: { data: { onScreenId } } } = this.props;
    this.props.onToggleSubtree(onScreenId);
  };


  // hasChildWidgets = (children) => {
  //   if (!children || children.length === 0) {
  //     return false;
  //   }
  //
  //   return _.some(children, c => c.type === 'widget' || this.hasChildWidgets(c.children));
  // };


  renderContextMenu = (isSelected) => {
    const { isMovingWidget, treeItem: { data: { onScreenId } } } = this.props;
    if (!isSelected || isMovingWidget) {
      return null;
    }

    return (<ComponentControlMenu onScreenId={onScreenId} />);
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


  // renderSecondaryText = (type, properties) => {
  //   if (type === 'zone') {
  //     let zoneSettings = '';
  //     if (properties.isRecursive) zoneSettings += ' recursive';
  //     if (properties.isGlobal) zoneSettings += ' global';
  //
  //     return zoneSettings === '' ? 'zone' : `${type}:${zoneSettings}`;
  //   }
  //
  //   return `${type}: ID - ${properties.widgetId}`;
  // };


  renderListItemTextWrapper = (primaryText, isSelected, classes) => {
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

  renderListItemIcon = (type, iconSrc, isNew, isSelected, classes) => {
    const className = isSelected ? classes.componentAvatarSelected : classes.componentAvatar;

    switch (type) {
      case ELEMENT_TYPE.ZONE:
        return (
          <ZoneIcon className={className} />
        );
      case ELEMENT_TYPE.WIDGET:
        if (iconSrc) {
          return (
            <Fragment>
              {iconSrc
                ? (<Avatar className={className} src={iconSrc} />)
                : (<Avatar className={className}><Widgets /></Avatar>)
              }
              {isNew && (<Unpublished className={classes.unpublishedOverlay} />)}
            </Fragment>
          );
        }
        return (<Avatar className={className}><Widgets /></Avatar>);
      case ELEMENT_TYPE.ARTICLE:
        return (<Fragment>
          <Avatar className={className}><ArticleIcon className={className} /></Avatar>
          {isNew && (<Unpublished className={classes.unpublishedOverlay} />)}
        </Fragment>);
      default:
        return null;
    }
  };

  renderListItem = () => {
    const {
      treeItem,
      selectedComponentId,
      classes,
    } = this.props;

    const { hasChildren, isExpanded, data } = treeItem;

    const { onScreenId, type, isNew, primaryText, isDisabled, iconSrc } = data;

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
        {this.renderListItemIcon(type, iconSrc, isNew, isSelected, classes)}
        {this.renderListItemTextWrapper(primaryText, isSelected, classes)}
        <ListItemSecondaryAction>
          {this.renderContextMenu(isSelected)}
          {this.renderCollapseButton(isExpanded, hasChildren, classes)}
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


export default withStyles(styles)(ComponentItem);
