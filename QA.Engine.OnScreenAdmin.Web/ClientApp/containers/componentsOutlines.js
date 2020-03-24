import { connect } from 'react-redux';
import { getComponentsListSelector } from 'selectors/componentTree';
import ComponentsOutlines from 'Components/ComponentsOutlines';
import { requestComponentsListUpdate } from 'actions/componentTree/actions';


const mapStateToProps = state => ({
  components: getComponentsListSelector(state),
});

const mapDispatchToProps = dispatch => ({
  requestUpdateComponents: () => { dispatch(requestComponentsListUpdate()); },
});

const ComponentsOutlinesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentsOutlines);

export default ComponentsOutlinesContainer;
