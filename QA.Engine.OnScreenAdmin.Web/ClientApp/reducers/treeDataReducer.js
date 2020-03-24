import {TREE_DATA_ACTIONS} from '../actions/actionTypes';
import buildTreeData from '../utils/buildTreeData';

const initialState = {
  treeData: null,
};

export default function treeDataReducer(state = initialState, action) {
  switch (action.type) {
    case TREE_DATA_ACTIONS.REBUILD_NEEDED:
      return {
        ...state,
        treeData: buildTreeData(
          action.payload.componentsFlatList,
          action.payload.disabledComponents,
          action.payload.allOpened,
          action.payload.availableWidgets,
          action.payload.showOnlyWidgets),
      };
    default:
      return state;
  }
}
