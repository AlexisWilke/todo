//import React, { Component } from 'react'

var global_id = 0

class PureTask {
  constructor() {
    global_id = global_id + 1

    this.id = global_id
    this.name = "New Task " + this.id
    this.list = "tasks"
console.log("Got PureTask " + this.id)
  }

  getId() {
    return this.id
  }

  getName() {
    return this.name
  }

  setName(new_name) {
    this.name = new_name
  }

  getList() {
    return this.list
  }

  setList(new_list) {
    this.list = new_list
  }
}

export default PureTask

// vim: ts=2 sw=2 et
