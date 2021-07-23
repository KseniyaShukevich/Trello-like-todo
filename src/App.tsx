import React, { useEffect } from 'react';
import ToolBar from './components/toolbar/ToolBar';
import Main from './components/main/Main';
import { useSelector } from 'react-redux';
import { selectTheme } from './slices/themeslice';
import { ThemeProvider } from '@material-ui/core/styles';
import themes from './components/toolbar/themes/themes';
import INITIAL_LISTS from './utils/initialLists';
import CONSTANT from './utils/CONSTANTS';
import { selectLists } from './slices/listsSlice';
import List from './components/list/list';

const App: React.FC = () => {
  const theme = useSelector(selectTheme);
  const lists: Array<List> = useSelector(selectLists);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem(`${CONSTANT.ID_LOCAL_STORAGE}lists`, JSON.stringify(lists));
    });
  }, [lists]);

  return(
    <ThemeProvider theme={themes[theme]}>
      <ToolBar />
      <Main />
    </ThemeProvider>
  )
}

export default App;
