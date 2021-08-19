import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import CONSTANTS from '../utils/CONSTANTS';

interface ITheme {
  value: number,
}

function getTheme(): number {
  const theme: string | null = localStorage.getItem(`${CONSTANTS.ID_LOCAL_STORAGE}theme`);
  if (theme) {
    return +theme;
  }
  return 0;
}

const initialState: ITheme = {
  value: getTheme(),
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.value = action.payload;
    }
  }
})

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.value;

export default themeSlice.reducer;
