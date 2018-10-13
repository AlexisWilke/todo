
// action types
//
export const ADD_NEW_TASK  = "add_new_task"
export const SET_TASK_NAME = "set_task_name"
export const MOVE_TASK     = "move_task"
export const DELETE_TASK   = "delete_task"

var global_id = 0

const initialState = {
  tasks: {}
}

function taskNextId() {
  global_id = global_id + 1
  return global_id
}


export const actionAddNewTask = () => {
  let new_id = taskNextId()
  let new_task = {
      id: new_id,
      name: "New Task #" + new_id + " (click to edit text)",
      list: "tasks"
    }

  return {
    type: ADD_NEW_TASK,
    payload: new_task
  }
}


export const actionSetTaskName = (task, new_name) => {
  let set_task_name = {
      id: task.id,
      name: new_name
    }

  return {
    type: SET_TASK_NAME,
    payload: set_task_name
  }
}


export const actionMoveTask = (task, new_list) => {
  let move_task = {
      id: task.id,
      list: new_list
    }

  return {
    type: MOVE_TASK,
    payload: move_task
  }
}


export const actionDeleteTask = (task) => {
  let delete_task = {
      id: task.id
    }

  return {
    type: DELETE_TASK,
    payload: delete_task
  }
}




export const addNewTask = (state, payload) => {
  return {
        //...state,
        tasks: {
            ...state.tasks,
            ["id" + payload.id]: payload
          }
      }
}


export const setTaskName = (state, payload) => {
  return {
        //...state,
        tasks: {
            ...state.tasks,
            ["id" + payload.id]: {
                ...state.tasks["id" + payload.id],
                "name": payload.name
              }
          }
      }
}


export const moveTask = (state, payload) => {
  return {
      //...state
      tasks: {
          ...state.tasks,
          ["id" + payload.id]: {
              ...state.tasks["id" + payload.id],
              "list": payload.list
            }
        }
    }
}


export const deleteTask = (state, payload) => {
  let new_state = {
      //...state
      tasks: {
          ...state.tasks,
          ["id" + payload.id]: null
        }
    }

  delete new_state.tasks["id" + payload.id]

  return new_state
}


export function taskApp(state = initialState, action) {
  switch (action.type) {
  case ADD_NEW_TASK:
    return addNewTask(state, action.payload)

  case SET_TASK_NAME:
    return setTaskName(state, action.payload)

  case MOVE_TASK:
    return moveTask(state, action.payload)

  case DELETE_TASK:
    return deleteTask(state, action.payload)

  default:
    return state

  }
}


// vim: ts=2 sw=2 et
