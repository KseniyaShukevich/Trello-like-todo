import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import CONSTANTS from '../CONSTANTS';
import { v4 as uuidv4 } from 'uuid';
import List from '../components/list/list';

interface ILists {
  value: Array<List>,
}

const initialState: ILists = {
  value: [
    {
      id: '1',
      name: 'List1',
      todos: [0, 1, 2],
    },
    {
      id: '2',
      name: 'List2',
      todos: [0, 1],
    },
  ],
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
    // addCard: (state, action) => {

    // },
  }
})

export const { addList, editList, deleteList } = listsSlice.actions;

export const selectLists = (state: RootState) => state.lists.value;

export default listsSlice.reducer;

