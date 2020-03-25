import store from 'store';
import _ from 'lodash';

/** @namespace window.currentPageId */

export const setSubtreeState = (treeData) => {
  const currentPageId = window.currentPageId;
  const key = `subtrees_state_${currentPageId}`;
  const filtered = _.filter(treeData.items, { isExpanded: true });
  const mapped = _.map(filtered, 'id');
  const currentData = { openedNodes: mapped };
  store.set(key, currentData);
};


export const getSubtreeState = () => {
  const currentPageId = window.currentPageId;
  const key = `subtrees_state_${currentPageId}`;
  return store.get(key);
};
