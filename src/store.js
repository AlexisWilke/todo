import { createStore } from 'redux'
import { taskApp } from './State'

const store = createStore(taskApp)

export default store

// vim: ts=2 sw=2 et
