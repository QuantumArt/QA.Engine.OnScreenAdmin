import {
  CHANGE_COMPONENT_TREE_SEARCH_TEXT, COMPONENTS_LIST_UPDATE_REQUESTED, COMPONENTS_LIST_UPDATED,
  TOGGLE_COMPONENT,
  TOGGLE_COMPONENT_TREE_SEARCH_BOX,
  TOGGLE_FULL_SUBTREE,
  TOGGLE_SHOW_ONLY_WIDGETS,
  TOGGLE_SUBTREE, TREE_DATA_UPDATE_REQUESTED, TREE_DATA_UPDATED,
  UPDATE_COMPONENTS, UPDATE_TREE_DATA,
} from './actionTypes';

export function toggleComponent(id) {
  return { type: TOGGLE_COMPONENT, id };
}

export function toggleSubtree(id) {
  return { type: TOGGLE_SUBTREE, id };
}

export function toggleFullSubtree(id) {
  return { type: TOGGLE_FULL_SUBTREE, id };
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
