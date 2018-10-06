import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


class AddTask extends Component {
  render() {
    return (
      <button onClick={this.props.onClick}>
        <FontAwesomeIcon icon={faPlus}/>
      </button>
    );
  }
}


export default AddTask

// vim: ts=2 sw=2 et
