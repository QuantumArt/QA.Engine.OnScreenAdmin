import { all } from 'redux-saga/effects';
import { watchSubtreeToggle } from './treeStateSagas';
import watchEditWidgetSaga from './editWidgetSagas';
// import watchAddWidgetSaga from './addWidgetSagas';
import watchQpForm from './qpFormSagas';
import watchMetaInfo from './metaInfoSagas';
import watchOnScreen from './onScreenEditControls';
import watchMoveWidget from './moveWidgetSagas';
import watchAbTests from './abTestsSagas';
import watchWidgetCreationWizard from './widgetCreationWizardSagas';
import watchWidgetScreen from './widgetScreenSagas';
import watchEditPage from './editPageSagas';
import watchEditArticle from './editArticleSagas';
import watchComponentsList from './componentsListSagas';
import watchDragAndDrop from './dragAndDropSagas';

export default function* rootSaga() {
  yield all([
    watchComponentsList(),
    watchSubtreeToggle(),
    watchEditWidgetSaga(),
    watchEditArticle(),
    // watchAddWidgetSaga(),
    watchQpForm(),
    watchMetaInfo(),
    watchOnScreen(),
    watchAbTests(),
    watchMoveWidget(),
    watchWidgetCreationWizard(),
    watchWidgetScreen(),
    watchEditPage(),
    watchDragAndDrop(),
  ]);
}
