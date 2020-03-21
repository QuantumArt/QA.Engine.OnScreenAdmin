import Tree from '@atlaskit/tree';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


import NewComponentItem from '../NewComponentItem';


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
    console.log('render item called', item);
    const component = item.data;
    const {
      isMovingWidget,
      onMovingWidgetSelectTargetZone,
      onToggleComponent,
      onToggleFullSubtree,
      onToggleSubtree,
      selectedComponentId,
    } = this.props;
    return (
      <div ref={provided.innerRef} {...provided.draggableProps}>
        <NewComponentItem
          {...component}
          onScreenId={component.onScreenId}
          hasChildren={item.hasChildren}
          isDisabled={component.isDisabled}
          isMovingWidget={isMovingWidget}
          isOpened={item.isExpanded}
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
    const { components } = this.props;
    console.log('rendering tree', components);
    return (<Tree
      tree={components}
      renderItem={this.renderItem}
      onExpand={this.onExpand}
      onCollapse={this.onCollapse}
      offsetPerLevel={16}
    />);
  }
}

export default NewComponentTree;

