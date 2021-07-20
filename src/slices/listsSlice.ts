import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import CONSTANTS from '../CONSTANTS';

interface IList {
  name: string,
  todos: Array<number>
}

interface ILists {
  value: Array<IList>,
}

const initialState: ILists = {
  value: [
    {
      name: 'List1',
      todos: [0, 1, 2],
    },
    {
      name: 'List2',
      todos: [0, 1],
    },
  ],
}

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    // addList: (state, action) => {

    // },
    // addCard: (state, action) => {

    // },
  }
})

// export const { addList, addCard } = listsSlice.actions;

export const selectLists = (state: RootState) => state.lists.value;

export default listsSlice.reducer;

