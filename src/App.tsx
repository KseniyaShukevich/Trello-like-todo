import React, { useEffect } from 'react';
import ToolBar from './components/toolbar/ToolBar';
import Main from './components/main/Main';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from './slices/themeslice';
import { ThemeProvider } from '@material-ui/core/styles';
import themes from './components/toolbar/themes/themes';
import CONSTANT from './utils/CONSTANTS';
import { selectLists, setLists } from './slices/listsSlice';
import List from './utils/List';
import { CloudinaryContext } from 'cloudinary-react';
import { selectHistory, selectTreckHistory, addHistoryPoint } from './slices/historySlice';

const App: React.FC = () => {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const lists: Array<List> = useSelector(selectLists);
  const historyTodo = useSelector(selectHistory);
  const treckHistory = useSelector(selectTreckHistory);

  useEffect(() => {
    treckHistory > -1 && dispatch(setLists(historyTodo[treckHistory]));
  }, [treckHistory]);

  useEffect(() => {
    lists.length && dispatch(addHistoryPoint(lists));
  }, [lists]);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem(`${CONSTANT.ID_LOCAL_STORAGE}history`, JSON.stringify(historyTodo.slice(0, treckHistory + 1)));
    });
  }, [historyTodo, treckHistory])

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
