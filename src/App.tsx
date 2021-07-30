import React, { useEffect } from 'react';
import ToolBar from './components/toolbar/ToolBar';
import Main from './components/main/Main';
import { useSelector } from 'react-redux';
import { selectTheme } from './slices/themeslice';
import { ThemeProvider } from '@material-ui/core/styles';
import themes from './components/toolbar/themes/themes';
import CONSTANT from './utils/CONSTANTS';
import { selectLists } from './slices/listsSlice';
import List from './utils/List';
import { CloudinaryContext } from 'cloudinary-react';

const App: React.FC = () => {
  const theme = useSelector(selectTheme);
  const lists: Array<List> = useSelector(selectLists);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem(`${CONSTANT.ID_LOCAL_STORAGE}lists`, JSON.stringify(lists));
    });
  }, [lists]);

  useEffect(() => {
    window.addEventListener('load', async () => {
      if (navigator.serviceWorker) {
        try {
          await navigator.serviceWorker.register('./sw.js');
        } catch (error) {
          console.log('Service Worker register fail');
        }
      }
    });
  }, []);

  return(
    <CloudinaryContext cloudName="dshffjhdkjj">
      <ThemeProvider theme={themes[theme]}>
        <ToolBar />
        <Main />
      </ThemeProvider>
    </CloudinaryContext>
  )
}

export default App;
