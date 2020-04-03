import {
  CHANGE_COMPONENT_TREE_SEARCH_TEXT,
  COMPONENTS_LIST_UPDATE_REQUESTED,
  COMPONENTS_LIST_UPDATED,
  TOGGLE_COMPONENT,
  TOGGLE_COMPONENT_TREE_SEARCH_BOX,
  TOGGLE_SHOW_ONLY_WIDGETS,
  TREE_DATA_UPDATE_REQUESTED,
  TREE_DATA_UPDATED,
  UPDATE_COMPONENTS,
  UPDATE_TREE_DATA,
  COMPONENT_TREE_ONSCREEN_SELECT_COMPONENT, EXPAND_SUBTREE, COLLAPSE_SUBTREE, DRAG_AND_DROP,
} from './actionTypes';


export function toggleComponent(id) {
  return { type: TOGGLE_COMPONENT, id };
}


export function expandSubtree(id) {
  return { type: EXPAND_SUBTREE, id };
}

export function collapseSubtree(id) {
  return { type: COLLAPSE_SUBTREE, id };
}

export function changeSearchText(newValue) {
  return { type: CHANGE_COMPONENT_TREE_SEARCH_TEXT, value: newValue };
}

export function updateComponents(components) {
  return { type: UPDATE_COMPONENTS, components };
}

export function toggleShowOnlyWidgets() {
  return { type: TOGGLE_SHOW_ONLY_WIDGETS };
}

export function toggleComponentTreeSearchBox() {
  return { type: TOGGLE_COMPONENT_TREE_SEARCH_BOX };
}

export function requestComponentsListUpdate() {
  return { type: COMPONENTS_LIST_UPDATE_REQUESTED };
}

export function componentsListUpdated() {
  return { type: COMPONENTS_LIST_UPDATED };
}

export function requestTreeDataUpdate() {
  return { type: TREE_DATA_UPDATE_REQUESTED };
}

export function updateTreeData(treeData) {
  return { type: UPDATE_TREE_DATA, treeData };
}

export function treeDataUpdated() {
  return { type: TREE_DATA_UPDATED };
}

export function componentTreeOnScreenOpenFullSubtree(id) {
  return { type: COMPONENT_TREE_ONSCREEN_SELECT_COMPONENT.OPEN_FULL_SUBTREE, id };
}

export function componentTreeOnScreenSelectComponent(id) {
  return { type: COMPONENT_TREE_ONSCREEN_SELECT_COMPONENT.SELECT_COMPONENT, id };
}

export function componentTreeOnScreenScrollToTreeItem(id) {
  return { type: COMPONENT_TREE_ONSCREEN_SELECT_COMPONENT.SCROLL_TO_TREE_ITEM, id };
}


export function dragComponentStart(id) {
  return { type: DRAG_AND_DROP.DRAG_START, payload: { onScreenId: id } };
}

export function dragComponentEnd(source, destination) {
  return { type: DRAG_AND_DROP.DRAG_END, payload: { source, destination } };
}

