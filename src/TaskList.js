import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import Task from './Task.js'


const taskDestination = {
  drop(props, monitor) {
    const droppedTask = monitor.getItem()
    props.onDrop(droppedTask)
    return { moved: true }
  }
}


function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  }
}


class TaskList extends Component {
  createTasks() {
    let tasks = []
    for (const p in this.props.tasks) {
      if (this.props.tasks[p].list === this.props.list) {
        tasks.push(
            <Task key={this.props.tasks[p].id}
                  task={this.props.tasks[p]}
                  list={this.props.list}
                  nextListName={this.props.nextListName}
                  onChangeName={(new_name) => this.props.onChangeName(this.props.tasks[p], new_name)}/>
          )
      }
    }
    return tasks
  }

  render() {
    return this.props.connectDropTarget(
          <div id={this.props.list}>
            <ul className={this.props.canDrop ? 'dragging' : 'normal'}>
              {this.createTasks()}
            </ul>
          </div>
    )
  }
}


export default DropTarget(ItemTypes.TASK, taskDestination, collect)(TaskList)


// vim: ts=2 sw=2 et
