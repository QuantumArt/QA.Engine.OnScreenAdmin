import { takeEvery, all, put, select, call } from 'redux-saga/effects';
import { EDIT_WIDGET_ACTIONS, WIDGETS_SCREEN_MODE_ACTIONS } from 'actions/actionTypes';
import { getMovingWidgetTargetZoneSelector, movingWidgetSelector } from 'selectors/componentTree';
import { moveWidget as apiMoveWidget, testMoveWidget as apiTestMoveWidget } from '../api';
import { showConfirmationDialog } from '../actions/confirmationDialog/actions';
import { CONFIRMATION_DIALOG_CANCELLED, CONFIRMATION_DIALOG_CONFIRMED } from '../actions/confirmationDialog/actionTypes';

const sidebarMoveConfirmationDialogId = 'SIDEBAR_CONFIRM_MOVE_WIDGET';
const dragAndDropMoveConfirmationDialogId = 'DRAG_AND_DROP_MOVE';

export const getDragAndDropChanges = state => state.articleManagement.dragAndDropComponent.changes;

function* selectTargetZone() {
  yield put(showConfirmationDialog(sidebarMoveConfirmationDialogId,
    'Перемещение виджета',
    'Вы действительно хотите переместить виджет?',
    'Да',
    'Отмена',
    true));
}

function* dragAndDropMove() {
  yield put(showConfirmationDialog(dragAndDropMoveConfirmationDialogId,
    'Перемещение виджета',
    'Вы действительно хотите переместить виджет?',
    'Да',
    'Отмена',
    true));
}

function* moveConfirmed(action) {
  if (action.payload.dialogId === sidebarMoveConfirmationDialogId) {
    const targetZone = yield select(getMovingWidgetTargetZoneSelector);
    const movingWidget = yield select(movingWidgetSelector);
    yield put({ type: EDIT_WIDGET_ACTIONS.MOVING_WIDGET_REQUESTED,
      changes: [{
        abstractItemId: movingWidget.properties.widgetId,
        newParentId: targetZone.properties.parentAbstractItemId,
        newZoneName: targetZone.properties.zoneName,
      }],
    });
  } else if (action.payload.dialogId === dragAndDropMoveConfirmationDialogId) {
    const changes = yield select(getDragAndDropChanges);
    yield put({ type: EDIT_WIDGET_ACTIONS.MOVING_WIDGET_REQUESTED, changes });
  }
}

function* moveWidgetRequested(action) {
  try {
    const result = yield call(apiMoveWidget, action.changes);
    yield put({ type: EDIT_WIDGET_ACTIONS.MOVING_WIDGET_SUCCEEDED, data: result });
  } catch (error) {
    yield put({ type: EDIT_WIDGET_ACTIONS.MOVING_WIDGET_FAILED, error });
  }
}

function moveWidgetSucceeded() {
  location.reload();
}

function* moveWidgetFailed() {
  yield put({ type: EDIT_WIDGET_ACTIONS.FINISH_MOVING_WIDGET });
}

function* showMoveWidget() {
  yield put({ type: WIDGETS_SCREEN_MODE_ACTIONS.SHOW_MOVE_WIDGET });
}

function* cancelMoveWidget() {
  yield put({ type: WIDGETS_SCREEN_MODE_ACTIONS.HIDE_MOVE_WIDGET });
  yield put({ type: EDIT_WIDGET_ACTIONS.FINISH_MOVING_WIDGET });
}

function* moveCancelled(action) {
  if (action.payload.dialogId === sidebarMoveConfirmationDialogId || action.payload.dialogId === dragAndDropMoveConfirmationDialogId) {
    yield cancelMoveWidget();
  }
}


function* watchMoveWidget() {
  yield takeEvery(EDIT_WIDGET_ACTIONS.MOVE_WIDGET, showMoveWidget);
}

function* watchCancelMoveWidget() {
  yield takeEvery(EDIT_WIDGET_ACTIONS.CANCEL_MOVING_WIDGET, cancelMoveWidget);
}

function* watchSelectTargetZone() {
  yield takeEvery(EDIT_WIDGET_ACTIONS.MOVING_WIDGET_SELECT_TARGET_ZONE, selectTargetZone);
}

function* watchMoveWidgetRequested() {
  yield takeEvery(EDIT_WIDGET_ACTIONS.MOVING_WIDGET_REQUESTED, moveWidgetRequested);
}

function* watchMoveWidgetSucceeded() {
  yield takeEvery(EDIT_WIDGET_ACTIONS.MOVING_WIDGET_SUCCEEDED, moveWidgetSucceeded);
}

function* watchMoveWidgetFailed() {
  yield takeEvery(EDIT_WIDGET_ACTIONS.MOVING_WIDGET_FAILED, moveWidgetFailed);
}

function* watchConfirm() {
  yield takeEvery(CONFIRMATION_DIALOG_CONFIRMED, moveConfirmed);
}

function* watchCancel() {
  yield takeEvery(CONFIRMATION_DIALOG_CANCELLED, moveCancelled);
}

function* watchDragAndDropMove() {
  yield takeEvery(EDIT_WIDGET_ACTIONS.DRAG_AND_DROP_MOVE, dragAndDropMove);
}


export default function* rootSaga() {
  yield all([
    watchSelectTargetZone(),
    watchMoveWidgetRequested(),
    watchMoveWidgetSucceeded(),
    watchMoveWidgetFailed(),
    watchMoveWidget(),
    watchCancelMoveWidget(),
    watchConfirm(),
    watchCancel(),
    watchDragAndDropMove(),
  ]);
}

