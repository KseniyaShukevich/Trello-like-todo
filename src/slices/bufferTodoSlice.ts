import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import Todo from '../utils/Todo';

interface IBufferTodo {
  value: Todo | null,
}

const initialState: IBufferTodo = {
  value: null,
}

export const bufferTodoSlice = createSlice({
  name: 'bufferTodo',
  initialState,
  reducers: {
    setBufferTodo: (state, action) => {
      state.value = action.payload;
    },
    editTodoColor: (state, action) => {
      state.value && (state.value.color = action.payload);
    },
    editTodoLabelIsActive: (state, action) => {
      const label = state.value?.labels.find((label) => label.id === action.payload.label.id);
      label && (label.isActive = action.payload.isActive);
    },
    editTodoLabelText: (state, action) => {
      const label = state.value?.labels.find((label) => label.id === action.payload.label.id);
      label && (label.text = action.payload.text);
    },
    editTodoTitle: (state, action) => {
      console.log();
    },
    editTodoText: (state, action) => {
      console.log();
    },
    editTodoStartDate: (state, action) => {
      console.log();
    },
    editTodoEndDate: (state, action) => {
      console.log();
    },
  }
})

export const {
  setBufferTodo,
  editTodoColor,
  editTodoLabelIsActive,
  editTodoLabelText,
  editTodoTitle,
  editTodoText,
  editTodoStartDate,
  editTodoEndDate,
} = bufferTodoSlice.actions;

export const selectBufferTodo = (state: RootState) => state.bufferTodo.value;

export default bufferTodoSlice.reducer;

