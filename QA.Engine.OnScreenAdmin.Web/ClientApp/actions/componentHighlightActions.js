import {
  TOGGLE_ALL_ZONES,
  TOGGLE_ALL_WIDGETS,
  TOGGLE_ZONES_TITLES,
} from './actionTypes';

export function toggleAllZones() {
  return { type: TOGGLE_ALL_ZONES };
}

export function toggleAllWidgets() {
  return { type: TOGGLE_ALL_WIDGETS };
}

export function toggleZonesTitles() {
  return { type: TOGGLE_ZONES_TITLES };
}
