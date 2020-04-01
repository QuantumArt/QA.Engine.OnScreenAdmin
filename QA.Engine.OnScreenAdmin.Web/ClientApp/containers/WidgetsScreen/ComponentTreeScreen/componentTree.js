import { connect } from 'react-redux';
import {
  getMaxNestLevelSelector,
  getSelectedComponentIdSelector,
  // filteredComponentTree,
  getDisabledComponentsSelector,
  getIsMovingWidgetSelector,
  getShowOnlyWidgetsSelector, getTreeDataSelector,
} from 'selectors/componentTree';
import ComponentTree from 'Components/WidgetsScreen/ComponentTreeScreen/ComponentTree';
import { movingWidgetSelectTargetZone } from '../../../actions/moveWidgetActions';
import {
  toggleComponent,
  // componentTreeOnScreenOpenFullSubtree,
  // toggleSubtree,
  expandSubtree,
  collapseSubtree,
} from '../../../actions/componentTree/actions';

const mapStateToProps = state => ({
  components: getTreeDataSelector(state),
  maxNestLevel: getMaxNestLevelSelector(state),
  selectedComponentId: getSelectedComponentIdSelector(state),
  searchText: state.sidebar.widgetScreenSearchText,
  isMovingWidget: getIsMovingWidgetSelector(state),
  disabledComponents: getDisabledComponentsSelector(state),
  showOnlyWidgets: getShowOnlyWidgetsSelector(state),
});

const mapDispatchToProps = dispatch => ({
  onToggleComponent: (id) => {
    dispatch(toggleComponent(id));
  },
  // onToggleSubtree: (id) => {
  //   dispatch(toggleSubtree(id));
  // },
  onMovingWidgetSelectTargetZone: (id) => {
    dispatch(movingWidgetSelectTargetZone(id));
  },
  onExpand: (id) => {
    dispatch(expandSubtree(id));
  },
  onCollapse: (id) => {
    dispatch(collapseSubtree(id));
  },
});

const ComponentTreeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentTree);

export default ComponentTreeContainer;
