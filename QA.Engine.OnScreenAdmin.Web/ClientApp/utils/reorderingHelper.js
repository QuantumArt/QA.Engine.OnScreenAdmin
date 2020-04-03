import _ from 'lodash';

const DEFAULT_SHIFT = 100;

// eslint-disable-next-line import/prefer-default-export
export const generateReorderChanges = (destComponents, itemToMove, index) => {
  const dest = _.cloneDeep(destComponents);

  const existingIndex = _.findIndex(dest, x => x.abstractItemId === itemToMove.abstractItemId);
  if (existingIndex !== -1) {
    dest.splice(existingIndex, 1);
  }

  dest.splice(index, 0, itemToMove);

  const length = dest.length;

  for (let i = 0; i < length; i += 1) {
    const current = dest[i];
    const left = i === 0 ? null : dest[i - 1];
    const right = i === length - 1 ? null : dest[i + 1];

    const needChangeOrder = (left && left.order >= current.order) || (right && right.order <= current.order);
    if (needChangeOrder) {
      if (!left) { // меняем в начале массива
        if (right.order <= 0) { // можем вписать как отрицательное число
          current.order = right.order - DEFAULT_SHIFT;
        } else if (right.order === 1) { // можем вписать как 0
          current.order = 0;
        } else if (right.order - DEFAULT_SHIFT > 0) { // вписываем с дефолтным сдвигом от правого
          current.order = right.order - DEFAULT_SHIFT;
        } else { // вписываем как среднее арифметическое
          current.order = Math.floor(right.order / 2);
        }
      } else if (!right) { // меняем в конце массива, можем просто прибавить дефолтный сдвиг по отношению к левому
        current.order = left.order + DEFAULT_SHIFT;
      } else { // меняем где-то внутри списка
        // eslint-disable-next-line no-lonely-if
        if (right.order - left.order > 1) { // есть промежуток, можем вписать по среднему арифметическому
          current.order = Math.floor((right.order + left.order) / 2);
        } else { // промежутка нет, придется у правого сдвигать order
          const rightHasRight = i < length - 2;
          if (!rightHasRight) { // элемент справа - последний в массиве, можем его сдвинуть на сколько угодно
            right.order = current.order + DEFAULT_SHIFT;
          } else { // после правого есть еще элементы
            const rightRight = dest[i + 2];
            const rightElementsGap = rightRight.order - right.order;
            if (rightElementsGap > 1) { // можем сдвинуть только правый элемент - есть промежуток дальше
              right.order = Math.floor((rightRight.order + right.order) / 2);
              current.order = Math.floor((right.order + left.order) / 2);
            } else { // сдвигаем правый на единицу
              current.order = right.order;
              right.order += 1;
            }
          }
        }
      }
    }
  }
  // console.groupCollapsed('reordering components');
  // console.log('original components');
  // console.table(destComponents);
  // console.log('reordered components');
  // console.table(dest);
  // console.groupEnd();

  const changes = [];
  _.forEach(dest, (x) => {
    const originalDestItem = _.find(destComponents, dc => dc.abstractItemId === x.abstractItemId);
    if (!originalDestItem || originalDestItem.order !== x.order) {
      changes.push({ abstractItemId: x.abstractItemId, newOrder: x.order });
    }
  });

  return changes;
};
