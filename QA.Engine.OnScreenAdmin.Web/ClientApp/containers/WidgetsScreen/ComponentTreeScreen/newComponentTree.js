import { connect } from 'react-redux';
import {
  getMaxNestLevelSelector,
  getSelectedComponentIdSelector,
  newFilteredComponentTree,
  getDisabledComponentsSelector,
  getIsMovingWidgetSelector,
  getShowOnlyWidgetsSelector,
} from 'selectors/componentTree';
import {
  toggleComponent,
  toggleSubtree,
  toggleFullSubtree,
  finishMovingWidget,
  movingWidgetSelectTargetZone,
} from 'actions/componentTreeActions';
import NewComponentTree from 'Components/WidgetsScreen/ComponentTreeScreen/NewComponentTree';

const mapStateToProps = state => ({
  components: newFilteredComponentTree(state),
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

const NewComponentTreeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewComponentTree);

export default NewComponentTreeContainer;
