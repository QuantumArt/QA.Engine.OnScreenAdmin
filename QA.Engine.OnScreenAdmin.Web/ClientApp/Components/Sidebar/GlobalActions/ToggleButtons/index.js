import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import { lightBlue, green, grey } from 'material-ui/colors';
import WidgetIcon from 'Components/Icons/Widget';
import ZoneIcon from 'Components/Icons/Zone';

const styles = theme => ({
  tooltipRoot: {
    fontSize: theme.typography.pxToRem(20),
  },
  buttonRoot: {
    width: theme.spacing.unit * 5,
    // height: theme.spacing.unit,
    minWidth: theme.spacing.unit * 5,
    fontSize: theme.typography.pxToRem(20),
  },
  zonesButtonChecked: {
    color: green[400],
  },
  widgetsButtonChecked: {
    color: lightBlue[400],
  },
  buttonUnchecked: {
    color: grey[500],
  },
});


const ToggleButtons = (props) => {
  const {
    showOnlyWidgets,
    showAllZones,
    showAllWidgets,
    toggleAllZones,
    toggleAllWidgets,
    classes,
  } = props;

  return (
    <Fragment>
      <Tooltip id="widgetsTooltip" title="Highlight widgets" classes={{ tooltip: classes.tooltipRoot }} enterDelay={300}>
        <Button
          classes={{ root: classes.buttonRoot }}
          onClick={toggleAllWidgets}
          className={showAllWidgets ? classes.widgetsButtonChecked : classes.buttonUnchecked}
          aria-label="Widgets"
        >
          <WidgetIcon />
        </Button>
      </Tooltip>
      {!showOnlyWidgets &&
        (
          <Tooltip id="zonesTooltip" title="Highlight zones" classes={{ tooltip: classes.tooltipRoot }} enterDelay={300}>
            <Button
              classes={{ root: classes.buttonRoot }}
              onClick={toggleAllZones}
              className={showAllZones ? classes.zonesButtonChecked : classes.buttonUnchecked}
            >
              <ZoneIcon />
            </Button>
          </Tooltip>
        )}

    </Fragment>
  );
};

ToggleButtons.propTypes = {
  showOnlyWidgets: PropTypes.bool.isRequired,
  showAllZones: PropTypes.bool.isRequired,
  showAllWidgets: PropTypes.bool.isRequired,
  toggleAllZones: PropTypes.func.isRequired,
  toggleAllWidgets: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToggleButtons);

