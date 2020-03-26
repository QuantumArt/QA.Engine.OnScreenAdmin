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
import { finishMovingWidget, movingWidgetSelectTargetZone } from '../../../actions/moveWidgetActions';
import { toggleComponent, componentTreeOnScreenOpenFullSubtree, toggleSubtree } from '../../../actions/componentTree/actions';

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
  onToggleSubtree: (id) => {
    dispatch(toggleSubtree(id));
  },
  onFinishMovingWidget: (id) => {
    dispatch(finishMovingWidget(id));
  },
  onMovingWidgetSelectTargetZone: (id) => {
    dispatch(movingWidgetSelectTargetZone(id));
  },
});

const ComponentTreeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComponentTree);

export default ComponentTreeContainer;
