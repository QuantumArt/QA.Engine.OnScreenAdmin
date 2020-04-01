import { EDIT_WIDGET_ACTIONS } from './actionTypes';

export default function cancelMoveWidget() {
  return { type: EDIT_WIDGET_ACTIONS.CANCEL_MOVING_WIDGET };
}

export function finishMovingWidget(id) {
  return { type: EDIT_WIDGET_ACTIONS.FINISH_MOVING_WIDGET, id };
}

export function movingWidgetSelectTargetZone(id) {
  return { type: EDIT_WIDGET_ACTIONS.MOVING_WIDGET_SELECT_TARGET_ZONE, id };
}

export function dragWidgetStart(id) {
  return { type: EDIT_WIDGET_ACTIONS.DRAG_AND_DROP_WIDGET_START, payload: { onScreenId: id } };
}

export function dragWidgetEnd(source, destination) {
  return { type: EDIT_WIDGET_ACTIONS.DRAG_AND_DROP_WIDGET_END, payload: { source, destination } };
}
