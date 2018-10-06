import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import Task from './Task.js';
import './App.css';


// TODO: get version from Package info
const version = "0.1.3";


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
        tasks: {  }
      }

    this.addNewTask = this.addNewTask.bind(this)
  }

  addNewTask() {
    let new_id = Task.getNextId()
    let new_task = {
        id: new_id,
        name: "New Task #" + new_id,
        list: "tasks"
      }

    this.setState(state => ({
        tasks: {
            ...state.tasks,
            ["id" + new_task.id]: new_task
          }
      }))
  }

  setTaskName(task, new_name) {
    this.setState(state => ({
        tasks: {
            ...state.tasks,
            ["id" + task.id]: {
                ...state.tasks["id" + task.id],
                "name": new_name.name
              }
          }
      }))
  }

  moveTask(task, new_list) {
    this.setState(state => ({
        tasks: {
            ...state.tasks,
            ["id" + task.id]: {
                ...state.tasks["id" + task.id],
                "list": new_list
              }
          }
      }))
  }

  render() {
    return (
      <div id='todo_app'>
        <h1>Daily TODO v{version}</h1>
        <div id='todo'>
          <div className='column'>
            <div className='inside'>
              <div id='add_task'>
                <AddTask onClick={() => { this.addNewTask() }}/>
              </div>
              <h2>Tasks</h2>
              <TaskList key='tasks'
                        list='tasks'
                        tasks={this.state.tasks}
                        onChangeList={(task) => { this.moveTask(task, 'processing') }}
                        onChangeName={(task, new_name) => { this.setTaskName(task, new_name) }}
                        onDrop={(task) => { this.moveTask(task, 'tasks') }}/>
            </div>
          </div>
          <div className='column'>
            <div className='row first'>
              <div className='inside'>
                <h2>In Progress</h2>
                <TaskList key='processing'
                          list='processing'
                          tasks={this.state.tasks}
                          onChangeList={(task) => { this.moveTask(task, 'done') }}
                          onChangeName={(task, new_name) => { this.setTaskName(task, new_name) }}
                          onDrop={(task) => { this.moveTask(task, 'processing') }}/>
              </div>
            </div>
            <div className='row'>
              <div className='inside'>
                <h2>On Hold</h2>
                <TaskList key='on_hold'
                          list='on_hold'
                          tasks={this.state.tasks}
                          onChangeList={(task) => { this.moveTask(task, 'done') }}
                          onChangeName={(task, new_name) => { this.setTaskName(task, new_name) }}
                          onDrop={(task) => { this.moveTask(task, 'on_hold') }}/>
              </div>
            </div>
          </div>
          <div className='column'>
            <div className='inside'>
              <h2>Done</h2>
              <TaskList key='done'
                        list='done'
                        tasks={this.state.tasks}
                        onChangeName={(task, new_name) => { this.setTaskName(task, new_name) }}
                        onDrop={(task) => { this.moveTask(task, 'done') }}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default DragDropContext(HTML5Backend)(App);

// vim: ts=2 sw=2 et
