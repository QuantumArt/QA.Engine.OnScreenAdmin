import { connect } from 'react-redux';
import {
  getMaxNestLevelSelector,
  getSelectedComponentIdSelector,
  filteredComponentTree,
  getDisabledComponentsSelector,
  getIsMovingWidgetSelector,
  getShowOnlyWidgetsSelector,
} from 'selectors/componentTree';
import NewComponentTree from 'Components/WidgetsScreen/ComponentTreeScreen/NewComponentTree';
import { finishMovingWidget, movingWidgetSelectTargetZone } from '../../../actions/moveWidgetActions';
import { toggleComponent, toggleFullSubtree, toggleSubtree } from '../../../actions/componentTree/actions';

const mapStateToProps = state => ({
  components: filteredComponentTree(state),
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
  onToggleFullSubtree: (id) => {
    dispatch(toggleFullSubtree(id));
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
)(NewComponentTree);

export default ComponentTreeContainer;
