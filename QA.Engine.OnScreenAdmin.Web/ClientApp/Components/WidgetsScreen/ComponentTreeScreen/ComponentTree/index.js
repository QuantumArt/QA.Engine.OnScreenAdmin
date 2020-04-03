import Tree from '@atlaskit/tree';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd-next';
import { ELEMENT_TYPE } from 'constants/elementTypes';

import ComponentItem from '../ComponentItem';


// workaround бага дерева, скопировано откуда-то из issues библиотеки
// TODO: если будет обновляться библиотека, проверить, можно ли обойтись без этого.
// Если нет - возможно нужно будет обновить патч с учетом обновленного кода render
class PatchTree extends Tree {
  render() {
    const { isNestingEnabled } = this.props;
    const renderedItems = this.renderItems();

    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        onDragUpdate={this.onDragUpdate}
      >
        <Droppable
          droppableId="tree"
          isCombineEnabled={isNestingEnabled}
          ignoreContainerClipping
        >
          {/* eslint-disable-next-line arrow-parens */}
          {dropProvided => {
            const finalProvided = this.patchDroppableProvided(dropProvided);
            return (
              <div
                ref={finalProvided.innerRef}
                style={{ pointerEvents: 'auto' }}
                onTouchMove={this.onPointerMove}
                onMouseMove={this.onPointerMove}
                {...finalProvided.droppableProps}
              >
                {renderedItems}
                {dropProvided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    );
  }
}


class ComponentTree extends Component {
  static propTypes = {
    components: PropTypes.any.isRequired,
    selectedComponentId: PropTypes.string.isRequired,
    onToggleComponent: PropTypes.func.isRequired,
    isMovingWidget: PropTypes.bool.isRequired,
    onMovingWidgetSelectTargetZone: PropTypes.func.isRequired,
    showOnlyWidgets: PropTypes.bool.isRequired,
    onExpand: PropTypes.func.isRequired,
    onCollapse: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
  };

  state = {
    isHovered: false,
  };

  onDragStart = (itemId) => {
    this.props.onDragStart(itemId);
  };

  onDragEnd = (source, destination) => {
    this.props.onDragEnd(source, destination);
  };

  isDragAllowed = itemData => itemData.type === ELEMENT_TYPE.WIDGET;


  renderItem = ({ item, provided }) => {
    const {
      isMovingWidget,
      onMovingWidgetSelectTargetZone,
      onToggleComponent,
      selectedComponentId,
      onExpand,
      onCollapse,
    } = this.props;


    // isDragDisabled не нашел как прикрутить в дерево, так что запрещаем таскать таким способом
    const dragHandleProps = { ...provided.dragHandleProps };
    if (!this.isDragAllowed(item.data)) {
      dragHandleProps.onFocus = () => {};
      dragHandleProps.onBlur = () => {};
      dragHandleProps.onMouseDown = () => {};
      dragHandleProps.onKeyDown = () => {};
      dragHandleProps.onTouchStart = () => {};
      dragHandleProps.draggable = false;
    }

    return (
      <div ref={provided.innerRef} {...provided.draggableProps} {...dragHandleProps}>
        <ComponentItem
          treeItem={item}
          isMovingWidget={isMovingWidget}
          onMovingWidgetSelectTargetZone={onMovingWidgetSelectTargetZone}
          selectedComponentId={selectedComponentId}
          onToggleComponent={onToggleComponent}
          onExpand={onExpand}
          onCollapse={onCollapse}
        />
      </div>
    );
  };


  render() {
    const { components, isMovingWidget, onCollapse, onExpand } = this.props;
    return (<PatchTree
      tree={components}
      renderItem={this.renderItem}
      onExpand={onExpand}
      onCollapse={onCollapse}
      offsetPerLevel={16}
      isDragEnabled={!isMovingWidget}
      onDragStart={this.onDragStart}
      onDragEnd={this.onDragEnd}
      isNestingEnabled
    />);
  }
}

export default ComponentTree;

