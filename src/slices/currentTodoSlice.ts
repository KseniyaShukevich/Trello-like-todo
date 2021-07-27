import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import CONSTANTS from '../utils/CONSTANTS';
import { v4 as uuidv4 } from 'uuid';
import List from '../utils/List';
import Todo from '../utils/Todo';
import INITIAL_LISTS from '../utils/initialLists';
import CONSTANT from '../utils/CONSTANTS';

interface ICurrentTodo {
  value: Todo | null,
}

const initialState: ICurrentTodo = {
  value: null,
}

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action) => {
      state.value = action.payload;
    },
    // editTodoColor: (state, action) => {
    //   console.log();
    // },
    // editTodoLabelIsActive: (state, action) => {
    //   console.log();
    // },
    // editTodoLabelText: (state, action) => {
    //   console.log();
    // },
    // editTodoTitle: (state, action) => {
    //   console.log();
    // },
    // editTodoText: (state, action) => {
    //   console.log();
    // },
    // editTodoStartDate: (state, action) => {
    //   console.log();
    // },
    // editTodoEndDate: (state, action) => {
    //   console.log();
    // },
  }
})

export const {
  setCurrentTodo,
  // editTodoColor,
  // editTodoLabelIsActive,
  // editTodoLabelText,
  // editTodoTitle,
  // editTodoText,
  // editTodoStartDate,
  // editTodoEndDate,
} = currentTodoSlice.actions;

export const selectCurrentTodo = (state: RootState) => state.currentTodo.value;

export default currentTodoSlice.reducer;

