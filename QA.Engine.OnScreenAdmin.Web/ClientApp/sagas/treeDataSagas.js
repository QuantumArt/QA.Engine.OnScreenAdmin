import { call, select, takeLatest } from 'redux-saga/effects';
import { setSubtreeState } from 'utils/componentTreeStateStorage';
import { OPEN_FULL_SUBTREE, EXPAND_SUBTREE, COLLAPSE_SUBTREE } from '../actions/componentTree/actionTypes';

export const getComponents = state => state.componentTree.components;

function* saveSubtreeOpenState() {
  try {
    const components = yield select(getComponents);
    yield call(setSubtreeState, components);
  } catch (error) {
    // do nothing
  }
}

export function* watchSubtreeToggle() {
  yield takeLatest([EXPAND_SUBTREE, COLLAPSE_SUBTREE, OPEN_FULL_SUBTREE], saveSubtreeOpenState);
}
