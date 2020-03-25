import { connect } from 'react-redux';
import { getComponentsListSelector, getShowOnlyWidgetsSelector } from 'selectors/componentTree';
import ComponentsOutlines from 'Components/ComponentsOutlines';
import { requestComponentsListUpdate } from 'actions/componentTree/actions';


const mapStateToProps = state => ({
  components: getComponentsListSelector(state),
  showOnlyWidgets: getShowOnlyWidgetsSelector(state),
});

const mapDispatchToProps = dispatch => ({
  requestUpdateComponents: () => { dispatch(requestComponentsListUpdate()); },
});

const ComponentsOutlinesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentsOutlines);

export default ComponentsOutlinesContainer;
