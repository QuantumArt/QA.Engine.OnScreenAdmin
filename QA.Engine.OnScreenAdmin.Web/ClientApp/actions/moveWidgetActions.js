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
