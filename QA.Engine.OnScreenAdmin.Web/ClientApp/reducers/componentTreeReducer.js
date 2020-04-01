import _ from 'lodash';
import { mutateTree } from '@atlaskit/tree';
import {
  CHANGE_COMPONENT_TREE_SEARCH_TEXT, TOGGLE_COMPONENT,
  TOGGLE_COMPONENT_TREE_SEARCH_BOX,
  TOGGLE_SHOW_ONLY_WIDGETS,
  UPDATE_COMPONENTS, UPDATE_TREE_DATA, COMPONENT_TREE_ONSCREEN_SELECT_COMPONENT, EXPAND_SUBTREE, COLLAPSE_SUBTREE,
} from '../actions/componentTree/actionTypes';


const getMaxNestLevel = comps => comps.map(c => c.nestLevel).reduce((max, cur) => Math.max(max, cur));

const initialState = {
  selectedComponentId: '',
  components: [],
  maxNestLevel: 0,
  searchText: '',
  showOnlyWidgets: false,
  showSearchBox: false,
};

export default function componentTreeReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_COMPONENTS:
      console.log('update components', action);
      return {
        ...state,
        components: action.components,
        maxNestLevel: getMaxNestLevel(action.components),
      };
    case TOGGLE_COMPONENT:
      return {
        ...state,
        components: state.components.map(component => (component.onScreenId === action.id
          ? ({ ...component, isSelected: !component.isSelected })
          : ({ ...component, isSelected: false })
        )),
        selectedComponentId: state.selectedComponentId === action.id
          ? ''
          : action.id,
      };

    case EXPAND_SUBTREE:
      return {
        ...state,
        treeData: mutateTree(state.treeData, action.id, { isExpanded: true }),
      };
    case COLLAPSE_SUBTREE:
      return {
        ...state,
        treeData: mutateTree(state.treeData, action.id, { isExpanded: false }),
      };
    case COMPONENT_TREE_ONSCREEN_SELECT_COMPONENT.OPEN_FULL_SUBTREE: {
      const onScreenId = action.id;
      let parentTreeItem = _.find(state.treeData.items, i => _.includes(i.children, onScreenId));
      let treeData = state.treeData;
      while (parentTreeItem && parentTreeItem.id !== 'root') {
        if (!parentTreeItem.isExpanded) {
          treeData = mutateTree(treeData, parentTreeItem.id, { isExpanded: true });
        }
        // eslint-disable-next-line no-loop-func
        parentTreeItem = _.find(state.treeData.items, i => _.includes(i.children, parentTreeItem.id));
      }
      return {
        ...state,
        treeData,
      };
    }
    case COMPONENT_TREE_ONSCREEN_SELECT_COMPONENT.SELECT_COMPONENT:
      return {
        ...state,
        components: state.components.map(component => (component.onScreenId === action.id
          ? ({ ...component, isSelected: true })
          : ({ ...component, isSelected: false })
        )),
        selectedComponentId: action.id,

      };


    case CHANGE_COMPONENT_TREE_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.value,
      };
    case TOGGLE_SHOW_ONLY_WIDGETS:
      return {
        ...state,
        showOnlyWidgets: !state.showOnlyWidgets,
      };
    case TOGGLE_COMPONENT_TREE_SEARCH_BOX:
      return {
        ...state,
        showSearchBox: !state.showSearchBox,
        searchText: '',
      };

    case UPDATE_TREE_DATA:
      return {
        ...state,
        treeData: action.treeData,
      };
    default:
      return state;
  }
}
