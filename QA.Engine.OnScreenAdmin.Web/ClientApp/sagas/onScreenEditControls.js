import scrollToElement from 'scroll-to-element';
import { put, takeEvery, all } from 'redux-saga/effects';
import { ONSCREEN_TOGGLE_COMPONENT } from '../actions/actionTypes';
import { TOGGLE_COMPONENT, TOGGLE_FULL_SUBTREE } from '../actions/componentTree/actionTypes';

function* toggleOnScreen(action) {
  yield put({ type: TOGGLE_COMPONENT, id: action.onScreenId });
  yield put({ type: TOGGLE_FULL_SUBTREE, id: action.onScreenId });
  scrollToElement(`[data-qa-component-on-screen-id="${action.onScreenId}"]`,
    { offset: -100,
      ease: 'in-out-expo', // https://github.com/component/ease#aliases
      duration: 1500,
    },
  );
}


function* watchOnScreenToggleComponent() {
  yield takeEvery(ONSCREEN_TOGGLE_COMPONENT, toggleOnScreen);
}

export default function* rootSaga() {
  yield all([
    watchOnScreenToggleComponent(),
  ]);
}
