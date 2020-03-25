import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Portal from 'Components/Portal';

import buildFlatList from 'utils/buildFlatList';

import ComponentOutline from './ComponentOutline';

const styles = () => ({
  highlightsWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
  },
});

class ComponentsOutlines extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.update);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.update);
  }

  update = () => {
    const { updateComponents } = this.props;
    const components = buildFlatList();
    updateComponents(components);
  }

  render() {
    const { showOnlyWidgets, components, classes } = this.props;
    return (
      <Portal>
        <div
          className={classes.highlightsWrap}
          style={{
            // height: `${document.body.offsetHeight}px`,
            // width: `${document.body.offsetWidth}px`,
            // height: '100%',
            // width: '100%',
          }}
        >
          {components.map((component) => {
            if (showOnlyWidgets && component.type !== 'widget') return null;

            const coords = component.properties.componentCoords;
            if (!Object.keys(coords).length) return null;

            return <ComponentOutline key={component.onScreenId} coords={coords} component={component} />;
          })}
        </div>
      </Portal>
    );
  }
}

ComponentsOutlines.propTypes = {
  showOnlyWidgets: PropTypes.bool.isRequired,
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateComponents: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComponentsOutlines);
