import { connect } from 'react-redux';

import ComponentsOutlines from 'Components/ComponentsOutlines';

import { getShowAllZones, getShowAllWidgets } from 'selectors/componentsHighlight';
import { getComponentsListSelector, getShowOnlyWidgetsSelector } from 'selectors/componentTree';

import { updateComponents } from 'actions/componentTreeActions';


const mapStateToProps = state => ({
  showOnlyWidgets: getShowOnlyWidgetsSelector(state),
  showAllZones: getShowAllZones(state),
  showAllWidgets: getShowAllWidgets(state),
  components: getComponentsListSelector(state),
});

const mapDispatchToProps = dispatch => ({
  updateComponents: components => dispatch(updateComponents(components)),
});

const ComponentsOutlinesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentsOutlines);

export default ComponentsOutlinesContainer;
