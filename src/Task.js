import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faBars } from '@fortawesome/free-solid-svg-icons'
import { ItemTypes } from './ItemTypes'
import { DragSource } from 'react-dnd'
import InlineEdit from 'react-edit-inline2'
import { actionSetTaskName, actionMoveTask, actionDeleteTask } from './State'
import store from './store'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'


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
  validateName(text) {
    return text.length > 0
  }


  handleChangeName = (new_name) => {
    return this.props.actionSetTaskName(this.props.task, new_name)
  }


  handleNextStep = () => {
    return this.props.actionMoveTask(this.props.task, this.props.nextListName)
  }


  handleDelete = () => {
    confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this task?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => store.dispatch(actionDeleteTask(this.props.task))
        },
        {
          label: 'No'
        }
      ]
    })
  }


  renderName() {
    if (this.props.task.list === 'done') {
      return (<span title={'Task #' + this.props.task.id + ': done'}>
                {this.props.task.name}
              </span>
      )
    }
    return (<span title={'Task #' + this.props.task.id + ': click to edit'}>
              <InlineEdit
                validate={this.validateName}
                activeClassName='editing'
                text={this.props.task.name}
                paramName='name'
                change={(name_change) => this.handleChangeName(name_change.name)}/>
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
          <div className='next-step' onClick={this.handleNextStep} title='click to move to next column on the right'>
            <FontAwesomeIcon icon={faArrowCircleRight}/>
          </div>
      )
    }
    return null
  }


  render() {
    return this.props.connectDragPreview(
          <li id={this.props.task.id}
              className={ this.props.isDragging ? 'dragging' : 'normal' }
              onDoubleClick={this.handleDelete}>
            {this.renderNext()}
            {this.renderDragAnchor()}
            {' '}
            {this.renderName()}
          </li>
    )
  }
}


Task = DragSource(ItemTypes.TASK, taskSource, collect)(Task)
export default connect(null, { actionSetTaskName, actionMoveTask, actionDeleteTask })(Task)


// vim: ts=2 sw=2 et
