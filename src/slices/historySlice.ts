import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import IList from '../components/list/IList';
import CONSTANTS from '../utils/CONSTANTS';
import INITIAL_LISTS from '../utils/initialLists';

interface IHistory {
  value: Array<Array<IList>>,
  track: number,
  isMoveTreck: boolean,
  isInitial: boolean,
}

const getHistory = (): Array<Array<IList>> => {
  const historyTodoString: string | null = localStorage.getItem(`${CONSTANTS.ID_LOCAL_STORAGE}history`);
  let historyTodo;

  if (historyTodoString) {
    historyTodo = JSON.parse(historyTodoString);

    if (historyTodo.length > 100) {
      historyTodo = historyTodo.slice(historyTodo.length - 100);
    } 
  }

  return historyTodoString ? historyTodo : [JSON.parse(JSON.stringify(INITIAL_LISTS))];
}

const getTrackHistory = (): number => {
  const trackString: string | null = localStorage.getItem(`${CONSTANTS.ID_LOCAL_STORAGE}trackHistory`);
  const historyTodoString: string | null = localStorage.getItem(`${CONSTANTS.ID_LOCAL_STORAGE}history`);
  let track;

  if (trackString) {
    track = +trackString;
    
    if (historyTodoString) {
      const historyTodo = JSON.parse(historyTodoString);
      const newHistoryTodo = historyTodo.slice(historyTodo.length - 100);
  
      if (historyTodo.length > 100 && !newHistoryTodo[track]) {
        const deletedPoints = historyTodo.splice(0, historyTodo.length - 100);
        
        track = track - deletedPoints.length; 
      }
    } 
  }

  return track ? track : 0;
}

const initialState: IHistory = {
  value: getHistory(),
  track: getTrackHistory(),
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
          state.value = [...state.value.slice(0, state.track + 1), action.payload];
          state.track = state.track + 1;
        }
      }
    },
    backHistoryPoint: (state) => {
      state.isMoveTreck = true;
      state.value[state.track - 1] && (state.track = state.track - 1);
    },
    forwardHistoryPoint: (state) => {
      state.isMoveTreck = true;
      state.value[state.track + 1] && (state.track = state.track + 1);
    },
  }
})

export const {
  addHistoryPoint,  
  backHistoryPoint,
  forwardHistoryPoint,
} = historySlice.actions;

export const selectHistory = (state: RootState) => state.history.value;
export const selectTrackHistory = (state: RootState) => state.history.track;

export default historySlice.reducer;

