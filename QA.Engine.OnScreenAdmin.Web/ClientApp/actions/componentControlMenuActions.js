import { EDIT_WIDGET_ACTIONS, EDIT_ARTICLE_ACTIONS } from './actionTypes';


export function editWidget(onScreenId) {
  return { type: EDIT_WIDGET_ACTIONS.EDIT_WIDGET, onScreenId };
}

export function moveWidget(onScreenId) {
  return { type: EDIT_WIDGET_ACTIONS.MOVE_WIDGET, onScreenId };
}

export function editArticle(onScreenId) {
  return {type: EDIT_ARTICLE_ACTIONS.EDIT_ARTICLE, onScreenId};
}
