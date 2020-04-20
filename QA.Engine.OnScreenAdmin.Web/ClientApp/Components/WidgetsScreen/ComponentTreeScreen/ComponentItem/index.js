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
import MaterialIcon from 'material-ui/Icon';
import ZoneIcon from 'Components/Icons/Zone';
import ArticleIcon from 'material-ui-icons/Description';
import { deepPurple, red } from 'material-ui/colors';
import ComponentControlMenu from 'containers/WidgetsScreen/componentControlMenu';
import { MAX_COMPONENT_PRIMARY_TEXT_LENGTH } from 'constants/general';
import { ELEMENT_TYPE } from 'constants/elementTypes';
import { Icon } from '@blueprintjs/core';


const styles = theme => ({
  componentAvatar: {
    borderRadius: 0,
    color: 'inherit',
    width: theme.typography.pxToRem(30),
    height: theme.typography.pxToRem(30),
    backgroundColor: 'white',
  },
  componentAvatarSelected: {
    borderRadius: 0,
    color: deepPurple[500],
    fontWeight: 'bold',
    width: theme.typography.pxToRem(30),
    height: theme.typography.pxToRem(30),
    backgroundColor: 'white',
  },
  unpublishedOverlay: {
    width: theme.typography.pxToRem(25),
    height: theme.typography.pxToRem(25),
    marginLeft: '-10px',
    marginTop: '-20px',
    color: red[500],
    zIndex: 100,
  },

  componentAvatarBlueprint: {
    borderRadius: 0,
    color: 'inherit',
    width: theme.typography.pxToRem(35),
    height: theme.typography.pxToRem(60),
    backgroundColor: 'white',
  },
  componentAvatarBlueprintSelected: {
    borderRadius: 0,
    color: deepPurple[500],
    fontWeight: 'bold',

    backgroundColor: 'white',
  },

  listItem: {
    height: theme.typography.pxToRem(76.8),
  },
  listItemTextPrimary: {
    fontSize: theme.typography.pxToRem(20),
  },
  listItemTextRoot: {
    // marginLeft: theme.spacing.unit,
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
    treeItem: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      children: PropTypes.arrayOf(PropTypes.string).isRequired,
      hasChildren: PropTypes.bool.isRequired,
      isExpanded: PropTypes.bool.isRequired,
      data: PropTypes.shape({
        onScreenId: PropTypes.string.isRequired,
        type: PropTypes.oneOf([ELEMENT_TYPE.WIDGET, ELEMENT_TYPE.ZONE, ELEMENT_TYPE.ARTICLE]).isRequired,
        primaryText: PropTypes.string.isRequired,
        icon: PropTypes.shape({
          iconUrl: PropTypes.string,
          iconClass: PropTypes.string,
          iconIntent: PropTypes.string,
        }),
        isDisabled: PropTypes.bool,
      }),
    }).isRequired,
    onToggleComponent: PropTypes.func.isRequired,
    onMovingWidgetSelectTargetZone: PropTypes.func.isRequired,
    selectedComponentId: PropTypes.string.isRequired,
    isMovingWidget: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    onExpand: PropTypes.func.isRequired,
    onCollapse: PropTypes.func.isRequired,


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


  handleSubtreeClick = () => {
    const { treeItem: { isExpanded, data: { onScreenId } }, onCollapse, onExpand } = this.props;
    if (isExpanded) {
      onCollapse(onScreenId);
    } else {
      onExpand(onScreenId);
    }
  };


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
        <MaterialIcon classes={{ root: classes.expandNodeIcon }}>
          {isOpened ? <ExpandLess /> : <ExpandMore />}
        </MaterialIcon>
      </IconButton>
    );
  };

  renderListItemIcon = (type, icon, isNew, isSelected, classes) => {
    const isBluePrintIcon = ELEMENT_TYPE.WIDGET && icon && icon.iconClass;
    // eslint-disable-next-line no-nested-ternary
    const className = isBluePrintIcon
      ? isSelected ? classes.componentAvatarBlueprintSelected : classes.componentAvatarBlueprint
      : isSelected ? classes.componentAvatarSelected : classes.componentAvatar;


    switch (type) {
      case ELEMENT_TYPE.ZONE:
        return (
          <ZoneIcon className={className} />
        );
      case ELEMENT_TYPE.WIDGET:
        if (icon && icon.iconClass) {
          return icon.iconIntent
            ? (<Avatar className={className}><Icon icon={icon.iconClass} intent={icon.iconIntent} />
              {isNew && (<Unpublished className={classes.unpublishedOverlay} />)}
            </Avatar>)
            : (<Avatar className={className}><Icon icon={icon.iconClass} />
              {isNew && (<Unpublished className={classes.unpublishedOverlay} />)}
            </Avatar>);
        }
        return (<Avatar className={className}><Widgets /></Avatar>);
      case ELEMENT_TYPE.ARTICLE:
        return (<Fragment>
          <Avatar className={className}>
            <ArticleIcon className={className} />
          </Avatar>
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

    const { onScreenId, type, isNew, primaryText, isDisabled, icon } = data;

    const isSelected = selectedComponentId === onScreenId;

    return (
      <div className={`treeItem-${onScreenId}`}>
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
          {this.renderListItemIcon(type, icon, isNew, isSelected, classes)}
          {this.renderListItemTextWrapper(primaryText, isSelected, classes)}
          <ListItemSecondaryAction>
            {this.renderContextMenu(isSelected)}
            {this.renderCollapseButton(isExpanded, hasChildren, classes)}
          </ListItemSecondaryAction>
        </ListItem>
      </div>
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
