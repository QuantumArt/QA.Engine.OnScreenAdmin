import _ from 'lodash';
import { ELEMENT_TYPE } from '../constants/elementTypes';

const getWidgetTypeIconSrc = (component, availableWidgets) => {
  if (availableWidgets === null || availableWidgets.length === 0) {
    return null;
  }
  const availableWidget = _.find(availableWidgets, { discriminator: component.properties.type });
  if (availableWidget && availableWidget.iconUrl) {
    return availableWidget.iconUrl;
  }

  return null;
};

function getNextParentOfType(onScreenId, hashmap, allowedTypes) {
  const component = hashmap[onScreenId];

  let parent = component && component.data.parentOnScreenId ? hashmap[component.data.parentOnScreenId] : null;
  while (parent && !_.includes(allowedTypes, parent.data.type)) {
    parent = parent.data.parentOnScreenId ? hashmap[parent.data.parentOnScreenId] : null;
  }
  return parent;
}

export default function buildTreeData(
  list,
  disabledComponents = [],
  allOpened = false,
  availableWidgets = [],
  showOnlyWidgets = false,
) {
  const allowedTypes = showOnlyWidgets
    ? [ELEMENT_TYPE.WIDGET]
    : [ELEMENT_TYPE.WIDGET, ELEMENT_TYPE.ZONE, ELEMENT_TYPE.ARTICLE];
  const _list = _.cloneDeep(list);
  const treeItems = _list.map(x => ({
    id: x.onScreenId,
    children: [],
    hasChildren: false,
    isExpanded: x.isOpened,
    isChildrenLoading: false,
    data: x,
  }));
  const rootItem = {
    id: 'root',
    children: [],
    hasChildren: false,
    isExpanded: true,
    isChildrenLoading: false,
  };

  const hashMap = {};
  _.forEach(treeItems, (treeItem) => {
    hashMap[treeItem.id] = treeItem;
  });


  // const tree = [];
  _.forEach(hashMap, (treeItem) => {
    const component = treeItem.data;
    component.isDisabled = _.indexOf(disabledComponents, component.onScreenId) !== -1;
    if (allOpened && treeItem.children.length > 0) {
      component.isOpened = true;
      treeItem.isExpanded = true;
    }
    if (component.type === ELEMENT_TYPE.WIDGET) {
      component.properties.widgetTypeIconSrc = getWidgetTypeIconSrc(component, availableWidgets);
    }

    let parentTreeItem = hashMap[component.parentOnScreenId];

    if (parentTreeItem && !_.includes(allowedTypes, parentTreeItem.data.type)) {
      const nextParent = getNextParentOfType(component.onScreenId, hashMap, allowedTypes);
      component.parentOnScreenId = nextParent ? nextParent.data.onScreenId : null;
      parentTreeItem = nextParent;
    }

    if (_.includes(allowedTypes, component.type)) {
      if (parentTreeItem) {
        parentTreeItem.children.push(treeItem.id);
      } else {
        rootItem.children.push(component.onScreenId);
      }
    }
  });
  const filteredItems = treeItems.filter(x => _.includes(allowedTypes, x.data.type));
  const treeItemsResult = {};
  treeItemsResult.root = rootItem;
  _.forEach(filteredItems, (item) => {
    treeItemsResult[item.id] = item;
  });

  const result = {
    rootId: 'root',
    items: treeItemsResult,
  };
  _.forEach(result.items, (x) => {
    x.hasChildren = x.children.length > 0;
  });
  console.log('buildTreeData: ', result);
  return result;
}

