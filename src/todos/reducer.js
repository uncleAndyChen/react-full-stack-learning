import {ADD_TODO, TOGGLE_TODO, REMOVE_TODO}from './actionTypes.js';

const initialState = [
    {
        text: 'first todo item',
        completed: false,
        id: 0
    },
    {
        text: 'welcome to react and redux learning',
        completed: false,
        id: 1
    }
];

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_TODO: {
      return [
        {
          id: action.id,
          text: action.text,
          completed: action.completed
        },
        ...state
      ]
    }
    case TOGGLE_TODO: {
      return state.map((todoItem) => {
        if (todoItem.id === action.id) {
           return {...todoItem, completed: !todoItem.completed};
        } else {
          return todoItem;
        }
      })
    }
    case REMOVE_TODO: {
      return state.filter((todoItem) => {
        return todoItem.id !== action.id;
      })
    }
    default: {
      return state;
    }
  }
}
