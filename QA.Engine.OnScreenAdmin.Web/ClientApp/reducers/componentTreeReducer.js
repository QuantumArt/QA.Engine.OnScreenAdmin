import _ from 'lodash';
import { mutateTree } from '@atlaskit/tree';
import {
  CHANGE_COMPONENT_TREE_SEARCH_TEXT, TOGGLE_COMPONENT,
  TOGGLE_COMPONENT_TREE_SEARCH_BOX, TOGGLE_FULL_SUBTREE,
  TOGGLE_SHOW_ONLY_WIDGETS, TOGGLE_SUBTREE,
  UPDATE_COMPONENTS, UPDATE_TREE_DATA,
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
    case TOGGLE_SUBTREE: {
      const node = _.find(state.treeData.items, { id: action.id });
      const prevState = node && node.isExpanded;
      return {
        ...state,
        treeData: mutateTree(state.treeData, action.id, { isExpanded: !prevState }),
      };
    }
    case TOGGLE_FULL_SUBTREE: {
      const getParentId = (id) => {
        const arr = id.split(';');

        return arr.slice(0, arr.length - 1).join(';');
      };

      const checkIfLastParent = (id) => {
        const arr = id.split(';');

        return arr.length < 2;
      };

      const componentsToEdit = [];
      const getIds = (id) => {
        const newId = getParentId(id);
        if (!checkIfLastParent(id)) {
          state.components.forEach((component) => {
            if (component.onScreenId === id) {
              componentsToEdit.push(component.onScreenId);
            }
          });
          getIds(newId);
        }
      };
      state.components.forEach((component) => {
        if (component.onScreenId === action.id) {
          getIds(component.onScreenId);
        }
      });

      return {
        ...state,
        components: state.components.map(component =>
          (componentsToEdit.indexOf(component.onScreenId) !== -1
            ? { ...component, isOpened: true }
            : { ...component, isOpened: false }),
        ),
      };
    }
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
