import scrollIntoView from 'scroll-into-view';
import { put, takeEvery, all } from 'redux-saga/effects';
import { ONSCREEN_SELECT_COMPONENT } from '../actions/actionTypes';
import {
  COMPONENT_TREE_ONSCREEN_SELECT_COMPONENT,
} from '../actions/componentTree/actionTypes';
import {
  componentTreeOnScreenOpenFullSubtree,
  componentTreeOnScreenScrollToTreeItem,
  componentTreeOnScreenSelectComponent,
} from '../actions/componentTree/actions';


function* onScreenSelectComponent(action) {
  yield put(componentTreeOnScreenOpenFullSubtree(action.onScreenId));
  yield put(componentTreeOnScreenSelectComponent(action.onScreenId));
}

function* onComponentSelected(action) {
  yield put(componentTreeOnScreenScrollToTreeItem(action.id));
}

function scrollToTreeItem(action) {
  // таймаут чтобы сработало после раскрытия дерева до нужного элемента
  setTimeout(() => {
    const elem = document.querySelector(`.treeItem-${action.id}`);
    if (elem) {
      scrollIntoView(elem, {
        time: 1500,
        validTarget: target => target !== window,
      });
    }
  }, 0);
}


function* watchOnScreenSelectComponent() {
  yield takeEvery(ONSCREEN_SELECT_COMPONENT, onScreenSelectComponent);
}

function* watchScrollTo() {
  yield takeEvery(COMPONENT_TREE_ONSCREEN_SELECT_COMPONENT.SCROLL_TO_TREE_ITEM, scrollToTreeItem);
}

function* watchComponentSelected() {
  yield takeEvery(COMPONENT_TREE_ONSCREEN_SELECT_COMPONENT.SELECT_COMPONENT, onComponentSelected);
}


export default function* rootSaga() {
  yield all([
    watchOnScreenSelectComponent(),
    watchComponentSelected(),
    watchScrollTo(),
  ]);
}
