import Tree from '@atlaskit/tree';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd-next';


import NewComponentItem from '../NewComponentItem';


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


class NewComponentTree extends Component {
  static propTypes = {
    components: PropTypes.any.isRequired,
    selectedComponentId: PropTypes.string.isRequired,
    onToggleComponent: PropTypes.func.isRequired,
    onToggleSubtree: PropTypes.func.isRequired,
    onToggleFullSubtree: PropTypes.func.isRequired,
    isMovingWidget: PropTypes.bool.isRequired,
    onMovingWidgetSelectTargetZone: PropTypes.func.isRequired,
    showOnlyWidgets: PropTypes.bool.isRequired,
  };

  state = {
    isHovered: false,
  };

  onExpand = () => {
    console.log('onExpand');
  };

  onCollapse = () => {
    console.log('onCollapse');
  };


  renderItem = ({ item, provided }) => {
    // console.log('render item called', item);
    const {
      isMovingWidget,
      onMovingWidgetSelectTargetZone,
      onToggleComponent,
      onToggleFullSubtree,
      onToggleSubtree,
      selectedComponentId,
    } = this.props;

    const newDraggableProps = {
      ...provided.draggableProps,
      // isDragDisabled: true,
    };

    return (
      <div ref={provided.innerRef} {...newDraggableProps} {...provided.dragHandleProps}>
        <NewComponentItem
          treeItem={item}
          isMovingWidget={isMovingWidget}
          onMovingWidgetSelectTargetZone={onMovingWidgetSelectTargetZone}
          selectedComponentId={selectedComponentId}
          onToggleComponent={onToggleComponent}
          onToggleFullSubtree={onToggleFullSubtree}
          onToggleSubtree={onToggleSubtree}
        />
      </div>
    );
  };

  render() {
    const { components, isMovingWidget } = this.props;
    console.log('rendering tree', components);
    return (<PatchTree
      tree={components}
      renderItem={this.renderItem}
      onExpand={this.onExpand}
      onCollapse={this.onCollapse}
      offsetPerLevel={16}
      isDragEnabled={!isMovingWidget}

    />);
  }
}

export default NewComponentTree;

