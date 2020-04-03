import { connect } from 'react-redux';
import {
  getMaxNestLevelSelector,
  getSelectedComponentIdSelector,
  getDisabledComponentsSelector,
  getIsMovingWidgetSelector,
  getShowOnlyWidgetsSelector, getTreeDataSelector,
} from 'selectors/componentTree';
import ComponentTree from 'Components/WidgetsScreen/ComponentTreeScreen/ComponentTree';
import { movingWidgetSelectTargetZone } from 'actions/moveWidgetActions';
import {
  toggleComponent,

  expandSubtree,
  collapseSubtree,
  dragComponentStart,
  dragComponentEnd,
} from 'actions/componentTree/actions';

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

  onMovingWidgetSelectTargetZone: (id) => {
    dispatch(movingWidgetSelectTargetZone(id));
  },
  onExpand: (id) => {
    dispatch(expandSubtree(id));
  },
  onCollapse: (id) => {
    dispatch(collapseSubtree(id));
  },
  onDragStart: (id) => {
    dispatch(dragComponentStart(id));
  },
  onDragEnd: (source, destination) => {
    dispatch(dragComponentEnd(source, destination));
  },
});

const ComponentTreeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentTree);

export default ComponentTreeContainer;
