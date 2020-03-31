import { TOGGLE_ALL_WIDGETS, TOGGLE_ALL_ZONES, TOGGLE_ZONES_TITLES } from '../actions/actionTypes';

const initialState = {
  showAllZones: false,
  showAllWidgets: false,
  showZonesTitles: false,
};

export default function componentsHighlightReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_ALL_WIDGETS:
      return { ...state, showAllWidgets: !state.showAllWidgets };

    case TOGGLE_ALL_ZONES:
      return { ...state, showAllZones: !state.showAllZones };

    case TOGGLE_ZONES_TITLES:
      return { ...state, showZonesTitles: !state.showZonesTitles };

    default:
      return state;
  }
}

