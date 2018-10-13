import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import AddTask from './AddTask.js'
import TaskList from './TaskList.js'
import './App.css'
import store from "./store"
import { actionMoveTask } from './State'


// TODO: get version from Package info
const version = "0.1.3"


class App extends Component {
  constructor(props) {
    super(props)

    store.subscribe(() => {
      this.setState(store.getState())
    })
  }


  handleMoveTask = (task, new_name) => {
    return this.props.actionMoveTask(task, new_name)
  }


  render() {
    return (
      <div id='todo_app'>
        <h1>Daily TODO v{version}</h1>
        <div id='todo'>
          <div className='column'>
            <div className='inside'>
              <div id='add_task'>
                <AddTask/>
              </div>
              <h2>Tasks</h2>
              <TaskList key='tasks'
                        list='tasks'
                        tasks={this.props.tasks}
                        nextListName='processing'
                        onDrop={(task) => { this.handleMoveTask(task, 'tasks') }}/>
            </div>
          </div>
          <div className='column'>
            <div className='row first'>
              <div className='inside'>
                <h2>In Progress</h2>
                <TaskList key='processing'
                          list='processing'
                          tasks={this.props.tasks}
                          nextListName='done'
                          onDrop={(task) => { this.handleMoveTask(task, 'processing') }}/>
              </div>
            </div>
            <div className='row'>
              <div className='inside'>
                <h2>On Hold</h2>
                <TaskList key='on_hold'
                          list='on_hold'
                          tasks={this.props.tasks}
                          nextListName='done'
                          onDrop={(task) => { this.handleMoveTask(task, 'on_hold') }}/>
              </div>
            </div>
          </div>
          <div className='column'>
            <div className='inside'>
              <h2>Done</h2>
              <TaskList key='done'
                        list='done'
                        tasks={this.props.tasks}
                        onDrop={(task) => { this.handleMoveTask(task, 'done') }}/>
            </div>
          </div>
        </div>
        <div><em>Double click task bar to delete it</em></div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { tasks: state.tasks }
}

App = DragDropContext(HTML5Backend)(App)
export default connect(mapStateToProps, { actionMoveTask })(App)

// vim: ts=2 sw=2 et
