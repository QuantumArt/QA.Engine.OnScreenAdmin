import { connect } from 'react-redux';

import ComponentsOutlines from 'Components/ComponentsOutlines';
import { requestComponentsListUpdate } from 'actions/componentTree/actions';

import { getShowAllZones, getShowAllWidgets } from 'selectors/componentsHighlight';
import { getComponentsListSelector, getShowOnlyWidgetsSelector } from 'selectors/componentTree';
import onScreenSelectComponent from '../actions/editComponentTreeActions';

const mapStateToProps = state => ({
  showOnlyWidgets: getShowOnlyWidgetsSelector(state),
  showAllZones: getShowAllZones(state),
  showAllWidgets: getShowAllWidgets(state),
  components: getComponentsListSelector(state),
});

const mapDispatchToProps = dispatch => ({
  requestUpdateComponents: () => { dispatch(requestComponentsListUpdate()); },
  onSelectComponent: (id) => { dispatch(onScreenSelectComponent(id)); },
});

const ComponentsOutlinesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentsOutlines);

export default ComponentsOutlinesContainer;
