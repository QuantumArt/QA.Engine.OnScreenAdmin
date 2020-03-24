import { all, put, takeEvery } from 'redux-saga/effects';
import { APP_STARTED } from '../actions/actionTypes';

import { COMPONENTS_LIST_UPDATE_REQUESTED, UPDATE_COMPONENTS } from '../actions/componentTree/actionTypes';
import buildFlatList from '../utils/buildFlatList';
import { componentsListUpdated, requestComponentsListUpdate, updateComponents } from '../actions/componentTree/actions';


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

function* watchAppStarted() {
  yield takeEvery(APP_STARTED, appStarted);
}

function* watchComponentsListUpdateRequested() {
  yield takeEvery(COMPONENTS_LIST_UPDATE_REQUESTED, buildComponentsList);
}

function* watchUpdateComponents() {
  yield takeEvery(UPDATE_COMPONENTS, componentsUpdated);
}


export default function* rootSaga() {
  yield all([
    watchAppStarted(),
    watchComponentsListUpdateRequested(),
    watchUpdateComponents(),
  ]);
}
