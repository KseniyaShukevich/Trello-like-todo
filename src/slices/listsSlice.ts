import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import CONSTANTS from '../utils/CONSTANTS';
import { v4 as uuidv4 } from 'uuid';
import List from '../utils/List';
import Todo from '../utils/Todo';
import INITIAL_LISTS from '../utils/initialLists';
import CONSTANT from '../utils/CONSTANTS';

interface ILists {
  value: Array<List>,
}

function getLists(): Array<List> {
  const lists = localStorage.getItem(`${CONSTANT.ID_LOCAL_STORAGE}lists`);
  if (lists) {
    return JSON.parse(lists);
  }

  return INITIAL_LISTS;
}

const initialState: ILists = {
  value: getLists(),
}

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action) => {
      state.value.push({
        id: uuidv4(),
        name: action.payload,
        todos: [],
      });
    },
    editList: (state, action) => {
      const list = state.value.find((el) => el.id === action.payload.id);
      list && (list.name = action.payload.newName);
    },
    deleteList: (state, action) => {
      const index = state.value.indexOf(action.payload);
      state.value.splice(index, 1);
    },
    addTodo: (state, action) => {
      const list: List | undefined = state.value.find((list) => list.id === action.payload.idList);
      if (list) {
        const index: number = list && list.todos.findIndex((todo) => todo.id === action.payload.todo.id);
        if (index > -1) {
          list.todos.splice(index, 1, action.payload.todo);
        } else {
          list.todos.push(action.payload.todo);
        }
      }
    },
    deleteTodo: (state, action) => {
      const list: List | undefined = state.value.find((list) => list.id === action.payload.idList);
      if (list) {
        const index: number = list && list.todos.findIndex((todo) => todo.id === action.payload.idTodo);
        (index > -1) && list.todos.splice(index, 1);
      }
    },
  }
})

export const { addList, editList, deleteList, addTodo, deleteTodo } = listsSlice.actions;

export const selectLists = (state: RootState) => state.lists.value;

export default listsSlice.reducer;

