import { call, select, takeLatest } from 'redux-saga/effects';
import { setSubtreeState } from 'utils/componentTreeStateStorage';
import { TOGGLE_FULL_SUBTREE, TOGGLE_SUBTREE } from '../actions/componentTree/actionTypes';

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
  yield takeLatest([TOGGLE_SUBTREE, TOGGLE_FULL_SUBTREE], saveSubtreeOpenState);
}
