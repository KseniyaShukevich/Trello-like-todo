import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { v4 as uuidv4 } from 'uuid';
import IList from '../components/list/IList';
import Todo from '../components/card/Todo';
import Fuse from 'fuse.js'

const options = {
  includeScore: true,
  keys: ['title'],
}

interface ILists {
  value: Array<IList>,
  searched: Array<any>,
}

const initialState: ILists = {
  value: [],
  searched: [],
}

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setLists: (state, action) => {
      state.value = action.payload;
    },
    addList: (state, action) => {
      state.value.push({
        id: uuidv4(),
        name: action.payload,
        todos: [],
      });
    },
    editList: (state, action) => {
      const list: IList | undefined = state.value.find((el) => el.id === action.payload.id);
      list && (list.name = action.payload.newName);
    },
    deleteList: (state, action) => {
      const index: number = state.value.findIndex((list) => list.id === action.payload);
      state.value.splice(index, 1);
    },
    addTodo: (state, action) => {
      const list: IList | undefined = state.value.find((list) => list.id === action.payload.idList);
      
      if (list) {
        const oldTodo: Todo | undefined = list.todos.find((todo) => todo.id === action.payload.todo.id);
        const newTodo: Todo = JSON.parse(JSON.stringify(action.payload.todo));
        const index: number = list.todos.findIndex((todo) => todo.id === action.payload.todo.id);

        newTodo.images.push(...action.payload.newImages);

        const isSameTodo: boolean = JSON.stringify(oldTodo) === JSON.stringify(newTodo);

        if (index > -1) {
          !isSameTodo && list.todos.splice(index, 1, newTodo);
        } else {
          list.todos.push(newTodo);
        }
      }
    },
    deleteTodo: (state, action) => {
      const list: IList | undefined = state.value.find((list) => list.id === action.payload.idList);

      if (list) {
        const index: number = list.todos.findIndex((todo) => todo.id === action.payload.idTodo);
        (index > -1) && list.todos.splice(index, 1);
      }
    },
    moveTodo: (state, action) => {
      const oldList: IList | undefined = state.value.find((list) => list.id === action.payload.todo.idList)
      const newList: IList | undefined = state.value.find((list) => list.id === action.payload.idList);

      if (oldList && newList) {
        const currentTodo: Todo | undefined = oldList.todos.find((todo) => todo.id === action.payload.todo.id);
        const indexTodo: number = oldList.todos.findIndex((todo) => todo.id === action.payload.todo.id);
        if (currentTodo && indexTodo > -1) {
          currentTodo.idList = newList.id;
          oldList.todos.splice(indexTodo, 1);
          newList.todos.unshift(currentTodo);
        }
      }
    },
    swapTodo: (state, action) => {
      const list: IList | undefined = state.value.find((list) => list.id === action.payload.todo.idList);
      const todo: Todo | undefined = list?.todos.find((todo) => todo.id === action.payload.todo.id);
      const indexTodo: number | undefined = list?.todos.findIndex((todo) => todo.id === action.payload.todo.id);

      if (list && todo && indexTodo !== undefined && indexTodo > -1) {
        if (action.payload.isDown) {
          const prevTodo: Todo | undefined = list.todos[indexTodo + 1];
          prevTodo && list.todos.splice(indexTodo, 2, prevTodo, todo);
        } else {
          const nextTodo: Todo | undefined = list.todos[indexTodo - 1];
          nextTodo && list.todos.splice(indexTodo - 1, 2, todo, nextTodo);
        }
      }
    },
    searchTodos: (state, action) => {      
      const todos: Array<Todo> = [];

      state.value.forEach((list: IList) => todos.push(...list.todos));

      const fuse = new Fuse(todos, options);

      state.searched = fuse.search(action.payload);
    },
  }
})

export const {
  setLists,
  addList, 
  editList, 
  deleteList, 
  addTodo, 
  deleteTodo, 
  moveTodo,
  swapTodo, 
  searchTodos,
} = listsSlice.actions;

export const selectLists = (state: RootState) => state.lists.value;
export const selectSearchedTodos = (state: RootState) => state.lists.searched;

export default listsSlice.reducer;

