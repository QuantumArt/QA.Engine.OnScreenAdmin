import {
  BEGIN_WIDGET_CREATION,
  SELECT_TARGET_ZONE,
  GO_TO_PREV_STEP,
  CHANGE_ZONES_LIST_SEARCH_TEXT,
  CHANGE_CUSTOM_ZONE_NAME,
  SELECT_WIDGET_TYPE,
  SELECT_ZONE_TYPE_EXISTING,
  SELECT_ZONE_TYPE_CUSTOM,
  TOGGLE_ZONES_LIST_SEARCH_BOX,
  TOGGLE_AVAILABLE_WIDGETS_SEARCH_BOX,
} from './actionTypes';

export function selectTargetZone(targetZoneName) {
  return {
    type: SELECT_TARGET_ZONE,
    payload: {
      targetZoneName,
    },
  };
}


export function selectCustomZoneType() {
  return {
    type: SELECT_ZONE_TYPE_CUSTOM,
  };
}

export function selectExistingZoneType() {
  return {
    type: SELECT_ZONE_TYPE_EXISTING,
  };
}

export function selectWidget(id) {
  return {
    type: SELECT_WIDGET_TYPE,
    payload: {
      selectedWidgetId: id,
    },
  };
}

export function beginWidgetCreation({ creationMode, parentOnScreenId, targetZoneName }) {
  return {
    type: BEGIN_WIDGET_CREATION,
    payload: {
      creationMode,
      parentOnScreenId,
      targetZoneName,
    },
  };
}

export function changeZonesListSearchText(newValue) {
  return {
    type: CHANGE_ZONES_LIST_SEARCH_TEXT,
    payload: {
      newValue,
    },
  };
}

export function toggleZonesListSearchBox() {
  return {
    type: TOGGLE_ZONES_LIST_SEARCH_BOX,
  };
}

export function toggleAvailableWidgetsSearchBox() {
  return {
    type: TOGGLE_AVAILABLE_WIDGETS_SEARCH_BOX,
  };
}

export function changeCustomZoneName(newValue) {
  return {
    type: CHANGE_CUSTOM_ZONE_NAME,
    payload: {
      customZoneName: newValue,
    },
  };
}

export function goToPrevStep() {
  return {
    type: GO_TO_PREV_STEP,
  };
}

