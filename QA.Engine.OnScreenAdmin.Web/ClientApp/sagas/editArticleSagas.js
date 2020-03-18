import { select, put, takeEvery, all } from 'redux-saga/effects';
import _ from 'lodash';
import { EDIT_ARTICLE_ACTIONS, CONTENT_META_INFO_ACTION } from 'actions/actionTypes';
import { qpFormCallback } from './qpFormSagas';

import { editArticle as editArticleQpForm } from '../articleManagement';


const currentEditingArticleSelector = state =>
  _.find(state.componentTree.components, { onScreenId: state.articleManagement.editArticle.onScreenId });


function* editArticle() {
  const article = yield select(currentEditingArticleSelector);
  console.log('edit article saga.', article);
  editArticleQpForm(article.properties.articleId, qpFormCallback, article.properties.contentId);
  yield put({ type: EDIT_ARTICLE_ACTIONS.SHOW_QP_FORM });
}


function* watchEditArticle() {
  yield takeEvery(EDIT_ARTICLE_ACTIONS.EDIT_ARTICLE, editArticle);
}



export default function* rootSaga() {
  yield all([
    watchEditArticle(),
  ]);
}

