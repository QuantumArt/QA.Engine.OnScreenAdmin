import { createSelector } from 'reselect';

const getShowAllZonesSelector = state => state.componentsHighlight.showAllZones;
const getShowAllWidgetsSelector = state => state.componentsHighlight.showAllWidgets;
const getShowZonesTitlesSelector = state => state.componentsHighlight.showZonesTitles;

export const getShowAllZones = createSelector(
  [getShowAllZonesSelector],
  showAllZones => showAllZones,
);

export const getShowAllWidgets = createSelector(
  [getShowAllWidgetsSelector],
  showAvailableWidgets => showAvailableWidgets,
);

export const getShowZonesTitles = createSelector(
  [getShowZonesTitlesSelector],
  showZonesTitles => showZonesTitles,
);
