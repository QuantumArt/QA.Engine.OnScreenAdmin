import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { ELEMENT_TYPE } from "constants/elementTypes";

const styles = theme => ({
  menuItem: {
    fontSize: theme.spacing.unit * 1.8,
  },
});

class ComponentControlMenu extends Component {
  state = {
    anchorEl: null,
  };

  getAnchorEl = () => {
    const { renderMenuButton, anchorEl } = this.props;
    return renderMenuButton ? this.state.anchorEl : anchorEl;
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    const { renderMenuButton, onMenuClose } = this.props;
    if (renderMenuButton) {
      this.setState({ anchorEl: null });
    } else if (onMenuClose) {
      onMenuClose();
    }
  };

  handleEditWidget = () => {
    const { onEditWidget, onScreenId } = this.props;
    this.handleRequestClose();
    onEditWidget(onScreenId);
  };

  handleAddWidgetToZone = () => {
    const { onAddWidgetToZone, onScreenId, zoneName } = this.props;
    this.handleRequestClose();
    onAddWidgetToZone(onScreenId, zoneName);
  };

  handleAddChildWidget = () => {
    const { onAddChildWidget, onScreenId } = this.props;
    this.handleRequestClose();
    onAddChildWidget(onScreenId);
  };

  handleMoveWidget = () => {
    const { onMoveWidget, onScreenId } = this.props;
    this.handleRequestClose();
    onMoveWidget(onScreenId);
  };

  handleEditArticle = () => {
    const { onEditArticle, onScreenId } = this.props;
    this.handleRequestClose();
    onEditArticle(onScreenId);
  };

  renderZoneMenu = () => {
    const { classes, isIframe, renderMenuButton } = this.props;
    const anchorEl = this.getAnchorEl();
    const open = Boolean(anchorEl);
    return (
      <Fragment>
        {renderMenuButton &&
          (<IconButton
            aria-label="More"
            aria-owns={open ? 'long-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MoreVertIcon />
          </IconButton>)
        }
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleRequestClose}
        >
          <MenuItem
            key="addWidget"
            onClick={this.handleAddWidgetToZone}
            classes={{ root: classes.menuItem }}
            disabled={!isIframe}
          >
            Add widget
          </MenuItem>
          <MenuItem
            key="anotherZoneAction"
            onClick={this.handleRequestClose}
            classes={{ root: classes.menuItem }}
          >
            Another zone action
          </MenuItem>
        </Menu>
      </Fragment>
    );
  };

  renderWidgetMenu = () => {
    const { classes, isIframe, renderMenuButton } = this.props;
    const anchorEl = this.getAnchorEl();
    const open = Boolean(anchorEl);
    return (
      <Fragment>
        {renderMenuButton &&
          (<IconButton
            aria-label="More"
            aria-owns={open ? 'long-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MoreVertIcon />
          </IconButton>)
        }
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleRequestClose}
        >
          <MenuItem
            key="editWidget"
            onClick={this.handleEditWidget}
            classes={{ root: classes.menuItem }}
            disabled={!isIframe}
          >
            Edit
          </MenuItem>
          <MenuItem
            key="addChildWidget"
            onClick={this.handleAddChildWidget}
            classes={{ root: classes.menuItem }}
            disabled={!isIframe}
          >
            Add child widget
          </MenuItem>
          <MenuItem
            key="moveWidget"
            onClick={this.handleMoveWidget}
            classes={{ root: classes.menuItem }}
            disabled={!isIframe}
          >
            Move
          </MenuItem>
        </Menu>
      </Fragment>
    );
  };

  renderArticleMenu = () => {
    const { classes, isIframe, renderMenuButton } = this.props;
    const anchorEl = this.getAnchorEl();
    const open = Boolean(anchorEl);
    return (
      <Fragment>
        {renderMenuButton &&
          (<IconButton
            aria-label="More"
            aria-owns={open ? 'long-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MoreVertIcon />
          </IconButton>)
        }
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleRequestClose}
        >
          <MenuItem
            key="editArticle"
            onClick={this.handleEditArticle}
            classes={{ root: classes.menuItem }}
            disabled={!isIframe}
          >
            Edit
          </MenuItem>
        </Menu>
      </Fragment>
    );
  };

  render() {
    const {
      type,
    } = this.props;
    switch(type) {
      case ELEMENT_TYPE.ZONE:
        return this.renderZoneMenu();
      case ELEMENT_TYPE.WIDGET:
        return this.renderWidgetMenu();
      case ELEMENT_TYPE.ARTICLE:
        return this.renderArticleMenu();
      default:
        return null;
    }
  }
}

ComponentControlMenu.propTypes = {
  onEditWidget: PropTypes.func.isRequired,
  onAddWidgetToZone: PropTypes.func.isRequired,
  onAddChildWidget: PropTypes.func.isRequired,
  onMoveWidget: PropTypes.func.isRequired,
  onEditArticle: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  zoneName: PropTypes.string.isRequired,
  onScreenId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  isIframe: PropTypes.bool.isRequired,
  renderMenuButton: PropTypes.bool,
  anchorEl: PropTypes.object,
  onMenuClose: PropTypes.func,
};

ComponentControlMenu.defaultProps = {
  renderMenuButton: true,
  anchorEl: null,
  onMenuClose: null,
};

export default withStyles(styles)(ComponentControlMenu);
