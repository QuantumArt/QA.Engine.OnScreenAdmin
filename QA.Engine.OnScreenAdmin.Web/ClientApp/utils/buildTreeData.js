import _ from 'lodash';
import { ELEMENT_TYPE } from '../constants/elementTypes';
import { getSubtreeState } from './componentTreeStateStorage';

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

function getNextParentOfType(onScreenId, list, allowedTypes) {
  const component = _.find(list, { onScreenId });

  let parent = component && component.parentOnScreenId
    ? _.find(list, { onScreenId: component.parentOnScreenId })
    : null;


  while (parent && !_.includes(allowedTypes, parent.type)) {
    parent = parent.parentOnScreenId
      ? _.find(list, { onScreenId: parent.parentOnScreenId })
      : null;
  }
  return parent;
}


// PropTypes.shape({
//   onScreenId: PropTypes.string.isRequired,
//   type: PropTypes.oneOf([ELEMENT_TYPE.WIDGET, ELEMENT_TYPE.ZONE, ELEMENT_TYPE.ARTICLE]).isRequired,
//   primaryText: PropTypes.string.isRequired,
//   iconSrc: PropTypes.string,
//   isDisabled: PropTypes.bool,
// });
function mapComponentToTreeItemData(source, availableWidgets, disabledComponents) {
  let primaryText = '';
  switch (source.type) {
    case ELEMENT_TYPE.ZONE:
      primaryText = source.properties.zoneName;
      break;
    case ELEMENT_TYPE.WIDGET:
      primaryText = `#${source.properties.widgetId} ${source.properties.title}`;
      break;
    case ELEMENT_TYPE.ARTICLE:
      primaryText = `#${source.properties.articleId} ${source.properties.title}`;
      break;
    default:
      break;
  }
  return {
    onScreenId: source.onScreenId,
    type: source.type,
    iconSrc: source.type === ELEMENT_TYPE.WIDGET ? getWidgetTypeIconSrc(source, availableWidgets) : '',
    isDisabled: _.indexOf(disabledComponents, source.onScreenId) !== -1,
    primaryText,
  };
}

const isOpened = (onScreenId, storedState) => {
  if (!storedState) { return false; }
  return _.includes(storedState.openedNodes, onScreenId);
};

export default function buildTreeData(
  list,
  disabledComponents = [],
  allOpened = false,
  availableWidgets = [],
  showOnlyWidgets = false,
) {
  console.log('buildTreeData called', { list, disabledComponents, allOpened, availableWidgets, showOnlyWidgets });
  if (!list) {
    return null;
  }
  const allowedTypes = showOnlyWidgets
    ? [ELEMENT_TYPE.WIDGET]
    : [ELEMENT_TYPE.WIDGET, ELEMENT_TYPE.ZONE, ELEMENT_TYPE.ARTICLE];
  const _list = _.cloneDeep(list);

  const storedState = getSubtreeState();

  const treeItems = _list.map(x => ({
    id: x.onScreenId,
    children: [],
    hasChildren: false,
    isExpanded: isOpened(x.onScreenId, storedState),
    isChildrenLoading: false,
    data: mapComponentToTreeItemData(x, availableWidgets, disabledComponents),
  }));

  const hashMap = {};
  _.forEach(treeItems, (treeItem) => {
    hashMap[treeItem.id] = treeItem;
  });

  const rootItem = {
    id: 'root',
    children: [],
    hasChildren: false,
    isExpanded: true,
    isChildrenLoading: false,
  };

  _.forEach(hashMap, (treeItem) => {
    const treeItemData = treeItem.data;

    const sourceComponent = _.find(_list, { onScreenId: treeItem.data.onScreenId });
    if (allOpened && treeItem.children.length > 0) {
      treeItem.isExpanded = true;
    }

    let parentTreeItem = hashMap[sourceComponent.parentOnScreenId];

    if (parentTreeItem && !_.includes(allowedTypes, parentTreeItem.type)) {
      const newParentSourceComponent = getNextParentOfType(treeItemData.onScreenId, _list, allowedTypes);
      const newParentId = newParentSourceComponent ? newParentSourceComponent.onScreenId : null;
      sourceComponent.parentOnScreenId = newParentId;
      parentTreeItem = newParentId ? hashMap[newParentId] : null;
    }

    if (_.includes(allowedTypes, treeItemData.type)) {
      if (parentTreeItem) {
        parentTreeItem.children.push(treeItem.id);
      } else {
        rootItem.children.push(treeItemData.onScreenId);
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

