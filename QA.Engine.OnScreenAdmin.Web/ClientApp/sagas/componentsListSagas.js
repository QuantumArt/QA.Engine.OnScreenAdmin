import { all, put, select, takeEvery, takeLatest, debounce } from 'redux-saga/effects';
import { APP_STARTED, EDIT_WIDGET_ACTIONS, WIDGETS_SCREEN_MODE_ACTIONS } from '../actions/actionTypes';

import {
  CHANGE_COMPONENT_TREE_SEARCH_TEXT,
  COMPONENTS_LIST_UPDATE_REQUESTED, COMPONENTS_LIST_UPDATED, TOGGLE_SHOW_ONLY_WIDGETS,
  TREE_DATA_UPDATE_REQUESTED,
  UPDATE_COMPONENTS, UPDATE_TREE_DATA,
} from '../actions/componentTree/actionTypes';
import buildFlatList from '../utils/buildFlatList';
import {
  componentsListUpdated,
  requestComponentsListUpdate,
  updateComponents,
  updateTreeData,
  treeDataUpdated as treeDataUpdatedAction, requestTreeDataUpdate,
} from '../actions/componentTree/actions';
import buildTreeData from '../utils/buildTreeData';
import {
  filteredComponentList,
  getDisabledComponentsSelector,
  getSearchTextSelector, getShowOnlyWidgetsSelector,
} from '../selectors/componentTree';
import { allAvailableWidgetsSelector } from '../selectors/availableWidgets';


function* appStarted() {
  yield put(requestComponentsListUpdate());
}

function* buildComponentsList() {
  const componentsList = buildFlatList();
  yield put(updateComponents(componentsList));
}

function* componentsUpdated() {
  yield put(componentsListUpdated());
}

function* needRebuildTreeData() {
  yield put(requestTreeDataUpdate());
}


function* rebuildTreeData() {
  console.log('rebuilding treeData');
  const searchText = yield select(getSearchTextSelector);
  const componentsList = yield select(filteredComponentList);
  const disabledComponents = yield select(getDisabledComponentsSelector);
  const availableWidgets = yield select(allAvailableWidgetsSelector);
  const showOnlyWidgets = yield select(getShowOnlyWidgetsSelector);
  const treeData = buildTreeData(
    componentsList,
    disabledComponents,
    searchText !== '',
    availableWidgets,
    showOnlyWidgets);
  yield put(updateTreeData(treeData));
}

function* treeDataUpdated() {
  yield put(treeDataUpdatedAction());
}

function* watchAppStarted() {
  yield takeEvery(APP_STARTED, appStarted);
}

function* watchComponentsListUpdateRequested() {
  yield takeEvery(COMPONENTS_LIST_UPDATE_REQUESTED, buildComponentsList);
}

function* watchUpdateComponents() {
  yield takeEvery(UPDATE_COMPONENTS, componentsUpdated);
}

function* searchTextUpdated() {
  yield put({ type: 'saga/SEARCH_TEXT_CHANGED' });
}

function* watchUpdateTreeData() {
  yield takeEvery(UPDATE_TREE_DATA, treeDataUpdated);
}

function* watchTreeDataUpdateRequested() {
  yield takeEvery(TREE_DATA_UPDATE_REQUESTED, rebuildTreeData);
}

function* watchNeedRebuildTreeData() {
  yield takeLatest([
    COMPONENTS_LIST_UPDATED,
    'saga/SEARCH_TEXT_CHANGED',
    EDIT_WIDGET_ACTIONS.MOVE_WIDGET,
    EDIT_WIDGET_ACTIONS.FINISH_MOVING_WIDGET,
    TOGGLE_SHOW_ONLY_WIDGETS,
    WIDGETS_SCREEN_MODE_ACTIONS.AVAILABLE_WIDGETS_INFO_LOADED],
  needRebuildTreeData,
  );
}

function* watchSearchTextWithDebounce() {
  yield debounce(500, CHANGE_COMPONENT_TREE_SEARCH_TEXT, searchTextUpdated);
}


export default function* rootSaga() {
  yield all([
    watchAppStarted(),
    watchComponentsListUpdateRequested(),
    watchUpdateComponents(),
    watchNeedRebuildTreeData(),
    watchTreeDataUpdateRequested(),
    watchUpdateTreeData(),
    watchSearchTextWithDebounce(),
  ]);
}
