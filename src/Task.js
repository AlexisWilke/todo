import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faBars } from '@fortawesome/free-solid-svg-icons'
import { ItemTypes } from './ItemTypes';
import { DragSource } from 'react-dnd';
import InlineEdit from 'react-edit-inline2';


var global_id = 0


const taskSource = {
  canDrag(props) {
    return props.task.list !== "done"
  },

  beginDrag(props) {
    return { id: props.task.id }
  }
}


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}


class Task extends Component {
  static getNextId() {
    global_id = global_id + 1
    return global_id
  }

  validateName(text) {
    return text.length > 0
  }

  renderName() {
    if (this.props.task.list === 'done') {
      return this.props.task.name
    }
    return (<span title='click to edit'>
              <InlineEdit
                validate={this.validateName}
                activeClassName='editing'
                text={this.props.task.name}
                paramName='name'
                change={(new_name) => this.props.onChangeName(new_name)}/>
            </span>
    )
  }

  renderDragAnchor() {
    if (this.props.task.list === 'done') {
      return <span className='drag-source'><FontAwesomeIcon icon={faBars}/></span>
    } else if (this.props.connectDragSource) {
      return this.props.connectDragSource(
            <span className='drag-source' title='click and drag to move task to another list'>
              <FontAwesomeIcon icon={faBars}/>
            </span>
      )
    }
    return null
  }

  renderNext() {
    if (this.props.task.list !== 'done') {
      return (
          <div className='next-step' onClick={this.props.onChangeList} title='click to move to next column on the right'>
            <FontAwesomeIcon icon={faArrowCircleRight}/>
          </div>
      )
    }
    return null
  }

  render() {
    return this.props.connectDragPreview(
          <li id={this.props.task.id} className={ this.props.isDragging ? 'dragging' : 'normal' }>
            {this.renderNext()}
            {this.renderDragAnchor()}
            {' '}
            {this.renderName()}
            {' '}
            ({this.props.task.id})
          </li>
    )
  }
}


export default DragSource(ItemTypes.TASK, taskSource, collect)(Task);


// vim: ts=2 sw=2 et
