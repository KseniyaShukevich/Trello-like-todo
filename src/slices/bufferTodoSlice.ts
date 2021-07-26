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
      state.value && (state.value.title = action.payload);
    },
    editTodoText: (state, action) => {
      state.value && (state.value.text = action.payload);
    },
    editTodoStartDate: (state, action) => {
      state.value && (state.value.startDate = action.payload);
    },
    editTodoEndDate: (state, action) => {
      state.value && (state.value.endDate = action.payload);
    },
    deleteTodoStartDate: (state) => {
      state.value && (state.value.startDate = '');
    },
    deleteTodoEndDate: (state) => {
      state.value && (state.value.endDate = '');
    }
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
  deleteTodoStartDate,
  deleteTodoEndDate,
} = bufferTodoSlice.actions;

export const selectBufferTodo = (state: RootState) => state.bufferTodo.value;

export default bufferTodoSlice.reducer;

