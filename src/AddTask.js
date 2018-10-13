import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { actionAddNewTask } from './State'


class AddTask extends Component {
  handleAddTask = () => {
    return this.props.actionAddNewTask()
  }

  render() {
    return (
      <button onClick={this.handleAddTask}>
        <FontAwesomeIcon icon={faPlus}/>
      </button>
    )
  }
}


export default connect(null, { actionAddNewTask })(AddTask)

// vim: ts=2 sw=2 et
