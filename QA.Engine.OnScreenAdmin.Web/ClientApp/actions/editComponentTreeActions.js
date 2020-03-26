import {
  ONSCREEN_SELECT_COMPONENT,
} from './actionTypes';

export default function onScreenSelectComponent(onScreenId) {
  return { type: ONSCREEN_SELECT_COMPONENT, onScreenId };
}
