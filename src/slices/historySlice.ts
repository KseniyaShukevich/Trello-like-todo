import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import List from '../utils/List';
import CONSTANTS from '../utils/CONSTANTS';
import INITIAL_LISTS from '../utils/initialLists';

interface IHistory {
  value: Array<Array<List>>,
  treck: number,
  isMoveTreck: boolean,
  isInitial: boolean,
}

const getHistory = (): Array<Array<List>> => {
  const historyTodo = localStorage.getItem(`${CONSTANTS.ID_LOCAL_STORAGE}history`);

  return historyTodo ? JSON.parse(historyTodo) : [JSON.parse(JSON.stringify(INITIAL_LISTS))];
}

const getTreckHistory = (): number => {
  const treck = localStorage.getItem(`${CONSTANTS.ID_LOCAL_STORAGE}treckHistory`);

  return treck ? +treck : 0;
}

const initialState: IHistory = {
  value: getHistory(),
  treck: getTreckHistory(),
  isMoveTreck: false,
  isInitial: true,
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistoryPoint: (state, action) => {
      if (state.isInitial) {
        state.isInitial = false;
      } else {
        if (state.isMoveTreck) {
          state.isMoveTreck = false;
        } else {
          state.value = [...state.value.slice(0, state.treck + 1), action.payload];
          state.treck = state.treck + 1;
        }
      }
    },
    backHistoryPoint: (state) => {
      state.isMoveTreck = true;
      state.value[state.treck - 1] && (state.treck = state.treck - 1);
    },
    forwardHistoryPoint: (state) => {
      state.isMoveTreck = true;
      state.value[state.treck + 1] && (state.treck = state.treck + 1);
    },
  }
})

export const {
  addHistoryPoint,  
  backHistoryPoint,
  forwardHistoryPoint,
} = historySlice.actions;

export const selectHistory = (state: RootState) => state.history.value;
export const selectTreckHistory = (state: RootState) => state.history.treck;

export default historySlice.reducer;

