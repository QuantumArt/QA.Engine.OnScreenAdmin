import { select, put, takeEvery, all } from 'redux-saga/effects';
import _ from 'lodash';
import { EDIT_ARTICLE_ACTIONS, CONTENT_META_INFO_ACTION } from 'actions/actionTypes';
import { qpFormCallback } from './qpFormSagas';

import { editArticle as editArticleQpForm } from '../articleManagement';


// const abstractItemMetaInfoSelector = state => state.metaInfo.abstractItemMetaInfo;
const currentEditingArticleSelector = state =>
  _.find(state.componentTree.components, { onScreenId: state.articleManagement.editArticle.onScreenId });
// const selfSource = 'meta_info_edit_article';


function* editArticle(action) {
  // см metaInfoSagas.js
  const article = yield select(currentEditingArticleSelector);
  console.log('edit article saga.', article);
  editArticleQpForm(article.properties.articleId, qpFormCallback, article.properties.contentId);
  yield put({ type: EDIT_ARTICLE_ACTIONS.SHOW_QP_FORM });
}

// function* showQpForm(action) {
//   if (action.source !== selfSource) { return; }
//
// }


function* watchEditArticle() {
  yield takeEvery(EDIT_ARTICLE_ACTIONS.EDIT_ARTICLE, editArticle);
}

// function* watchGetAbstractItemInfoSuccess() {
//   yield takeEvery(CONTENT_META_INFO_ACTION.GET_ABSTRACT_ITEM_INFO_SUCCESS, showQpForm);
// }


export default function* rootSaga() {
  yield all([
    watchEditArticle(),
    // watchGetAbstractItemInfoSuccess(),
  ]);
}

