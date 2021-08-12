import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import IList from '../components/list/IList';
import Todo from '../components/card/Todo';
import IParams from '../utils/IParams';

interface IListsDragging {
  draggingItem: IParams | null,
  value: Array<IList>,
}

const initialState: IListsDragging = {
  draggingItem: null,
  value: [],
}

export const listsDraggingSlice = createSlice({
  name: 'listsDragging',
  initialState,
  reducers: {
    setListsDragging: (state, action) => {
      state.value = action.payload;
    },
    setDraggingItem: (state, action) => {
      state.draggingItem = action.payload;
    },
    addDraggingTodoInEnd: (state, action) => {
      if (state.draggingItem) {
        const movedTodo: Todo = state.value[state.draggingItem.indexList].todos.splice(state.draggingItem.indexTodo, 1)[0];

        movedTodo.idList = state.value[action.payload].id;
        state.value[action.payload].todos.push(movedTodo);
        state.draggingItem = {
          indexList: action.payload,
          indexTodo: state.value[action.payload].todos.length -1 
        };
      }
    },
    changePositionDraggingTodo: (state, action) => {
      if (state.draggingItem) {
        const movedTodo: Todo = state.value[state.draggingItem.indexList].todos.splice(state.draggingItem.indexTodo, 1)[0];

        movedTodo.idList = state.value[action.payload.indexList].id;
        state.value[action.payload.indexList].todos.splice(action.payload.indexTodo, 0, movedTodo);
        state.draggingItem = {
          indexList: action.payload.indexList,
          indexTodo: action.payload.indexTodo,
        }
      }
    }
  }
})

export const {
  setListsDragging,
  setDraggingItem,
  addDraggingTodoInEnd,
  changePositionDraggingTodo,
} = listsDraggingSlice.actions;

export const selectDraggingItem = (state: RootState) => state.listsDragging.draggingItem;
export const selectListsDragging = (state: RootState) => state.listsDragging.value;

export default listsDraggingSlice.reducer;

