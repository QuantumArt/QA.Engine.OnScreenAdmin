import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {
  ListItem,
  ListItemText,
  // ListItemSecondaryAction,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { Icon } from '@blueprintjs/core';
import Widgets from 'material-ui-icons/Widgets';

const styles = theme => ({
  listItem: {
    height: theme.spacing.unit * 7.5,
    minWidth: 350,
  },
  listItemText: {
    fontSize: theme.typography.fontSize,
  },
  listItemSecondaryAction: {
    paddingRight: 80,
  },

  componentAvatar: {
    borderRadius: 0,
    color: 'inherit',
    backgroundColor: 'inherit',
    width: theme.typography.pxToRem(30),
    height: theme.typography.pxToRem(30),
    marginRight: theme.spacing.unit,
  },

});

class AvailableWidget extends Component {
  handleSelectClick = () => {
    this.props.onSelectWidget(this.props.id);
  }

  renderIcon = (iconClass, iconIntent, className) => ((iconClass)
    ? iconIntent
      ? (<Avatar className={className}><Icon icon={iconClass} intent={iconIntent} /></Avatar>)
      : (<Avatar className={className}><Icon icon={iconClass} /></Avatar>)
    : (<Avatar className={className}><Widgets /></Avatar>))

  render() {
    const {
      title,
      description,
      classes,
      iconClass,
      iconIntent,
    } = this.props;

    return (
      <ListItem
        classes={{
          root: classes.listItemRoot,
        }}
        button
        onClick={this.handleSelectClick}
      >
        {this.renderIcon(iconClass, iconIntent, classes.componentAvatar)}
        <ListItemText
          primary={title}
          secondary={description}
          classes={{ primary: classes.listItemText }}
        />
      </ListItem>


    );
  }
}

AvailableWidget.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  iconUrl: PropTypes.string,
  iconClass: PropTypes.string,
  iconIntent: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelectWidget: PropTypes.func.isRequired,
};

AvailableWidget.defaultProps = {
  description: '',
  iconUrl: null,
  iconClass: null,
  iconIntent: null,
};

export default withStyles(styles)(AvailableWidget);
