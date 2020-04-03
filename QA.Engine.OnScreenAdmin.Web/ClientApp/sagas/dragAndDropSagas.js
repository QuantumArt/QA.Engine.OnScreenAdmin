import _ from 'lodash';
import { takeEvery, all, select, put } from 'redux-saga/effects';
import { DRAG_AND_DROP } from 'actions/componentTree/actionTypes';
import { showNotification } from '../actions/notifications/actions';
import { ELEMENT_TYPE } from '../constants/elementTypes';
import { generateReorderChanges } from '../utils/reorderingHelper';

import { dragAndDropMove } from '../actions/moveWidgetActions';


const componentsSelector = state => state.componentTree.components;
const treeDataSelector = state => state.componentTree.treeData;


const getComponentAbstractItemId = (component) => {
  switch (component.type) {
    case ELEMENT_TYPE.WIDGET:
      return component.properties.widgetId;
    case ELEMENT_TYPE.ARTICLE:
      return component.properties.articleId;
    default:
      throw new Error('Не удалось определить abstractItemId');
  }
};


function* onDragEnd({ payload }) {
  // пока поддерживает только перетаскивание виджетов.
  // соответственно предположения: у перетаскиваемого компонента есть парент, и этот парент - зона.
  // destination тоже должен быть зоной
  // у зоны есть .properties.parentAbstractItemId (это айди виджета или страницы)
  try {
    console.log('caught drag end in saga', payload);
    const { source, destination } = payload;
    // ничего не поменялось, бросили там же, где взяли
    if (source.parentId === destination.parentId && source.index === destination.index) {
      console.log('nothing to move');
      return;
    }
    const components = yield select(componentsSelector);
    const treeData = yield select(treeDataSelector);
    const movingComponentOnScreenId = treeData.items[source.parentId].children[source.index];
    if (!movingComponentOnScreenId) {
      throw new Error('Компонент не найден в дереве');
    }
    const movingComponent = _.find(components, { onScreenId: movingComponentOnScreenId });
    if (!movingComponent) {
      throw new Error('Компонент не найден в списке');
    }
    console.log('found source component', { movingComponentOnScreenId, movingComponent });
    if (movingComponent.type !== ELEMENT_TYPE.WIDGET) {
      throw new Error('На данный момент поддерживается перемещение только виджетов');
    }

    const movingComponentAbstractItemId = movingComponent.properties.widgetId;

    if (!movingComponentAbstractItemId) {
      throw new Error('Не смогли определить abstract item id перемещаемого компонента');
    }

    const destinationComponent = _.find(components, { onScreenId: destination.parentId });
    if (!destinationComponent) {
      throw new Error('Новый родитель не найден');
    }
    if (destinationComponent.type !== ELEMENT_TYPE.ZONE) {
      yield put(showNotification('Перемещение виджета возможно только в зону', 5000));
      return;
    }


    // определяем, не пытаемся ли перетащить компонент в дочерний самому себе
    // такого быть не должно - визуально при перетаскивании компонент схлопывается и не дает выбрать назначением дочерние элементы, но мало ли что.
    let destinationParent = destinationComponent.parentOnScreenId
      ? _.find(components, { onScreenId: destinationComponent.parentOnScreenId })
      : null;
    console.log('destinationParent', destinationParent);
    while (destinationParent !== null) {
      if (destinationParent.onScreenId === movingComponentOnScreenId) {
        yield put(showNotification('Невозможно переместить компонент: целевая зона является дочерней по отношению к перемещаемой', 5000));
        return;
      }
      console.log('destinationParent', destinationParent);
      destinationParent = destinationParent.parentOnScreenId
        ? _.find(components, { onScreenId: destinationParent.parentOnScreenId })
        : null;
    }

    const sourceComponentChange = {
      abstractItemId: movingComponentAbstractItemId,
    };


    const sourceZone = _.find(components, { onScreenId: movingComponent.parentOnScreenId });
    if (!sourceZone) {
      throw new Error('Не смогли определить родительскую зону перемещаемого виджета');
    }
    if (sourceZone.properties.parentAbstractItemId !== destinationComponent.properties.parentAbstractItemId) {
      sourceComponentChange.newParentId = destinationComponent.properties.parentAbstractItemId;
    }
    if (sourceZone.properties.zoneName !== destinationComponent.properties.zoneName) {
      sourceComponentChange.newZoneName = destinationComponent.properties.zoneName;
    }

    let changes = [];
    const destinationTreeItem = treeData.items[destination.parentId];
    const destinationSiblingIds = destinationTreeItem.children;
    // пытаемся реордерить только если есть соседи в destination
    if (!_.isEmpty(destinationSiblingIds)) {
      const movingComponentOrder = movingComponent.properties.order;
      const destinationSiblings = destinationSiblingIds
        .map(x => _.find(components, { onScreenId: x }))
        .map(x => ({ abstractItemId: getComponentAbstractItemId(x), order: x.properties.order }));
      console.log('destination siblings:', destinationSiblings);
      changes = generateReorderChanges(destinationSiblings,
        { abstractItemId: movingComponentAbstractItemId, order: movingComponentOrder },
        destination.index);
      const movingComponentChangeIndex = _.findIndex(changes, x => x.abstractItemId === movingComponentAbstractItemId);
      if (movingComponentChangeIndex !== -1) {
        changes[movingComponentChangeIndex] = {
          ...changes[movingComponentChangeIndex],
          ...sourceComponentChange,
        };
      }
    } else {
      changes.push(sourceComponentChange);
    }

    yield put(dragAndDropMove(movingComponent.onScreenId, destinationComponent.onScreenId, changes));
  } catch (e) {
    yield put(showNotification('Произошла ошибка', 5000, true));
    console.log(e);
  }
}

function* watchDragEnd() {
  yield takeEvery(DRAG_AND_DROP.DRAG_END, onDragEnd);
}

export default function* rootSaga() {
  yield all([
    watchDragEnd(),
  ]);
}
