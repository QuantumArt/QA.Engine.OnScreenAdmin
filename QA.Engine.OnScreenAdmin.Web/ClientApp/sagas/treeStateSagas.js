import { call, select, takeLatest } from 'redux-saga/effects';
import { setSubtreeState } from 'utils/componentTreeStateStorage';
import { OPEN_FULL_SUBTREE, EXPAND_SUBTREE, COLLAPSE_SUBTREE } from '../actions/componentTree/actionTypes';

export const getTreeData = state => state.componentTree.treeData;

function* saveSubtreeOpenState() {
  try {
    const treeData = yield select(getTreeData);
    yield call(setSubtreeState, treeData);
  } catch (error) {
    // do nothing
  }
}

export function* watchSubtreeToggle() {
  yield takeLatest([EXPAND_SUBTREE, COLLAPSE_SUBTREE, OPEN_FULL_SUBTREE], saveSubtreeOpenState);
}
