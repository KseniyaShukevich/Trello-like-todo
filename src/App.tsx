import React, { useEffect } from 'react';
import ToolBar from './components/toolbar/ToolBar';
import Main from './components/main/Main';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme } from './slices/themeslice';
import { ThemeProvider } from '@material-ui/core/styles';
import themes from './components/themes/themes';
import CONSTANTS from './utils/CONSTANTS';
import { changePositionDraggingTodo, selectLists, setLists } from './slices/listsSlice';
import IList from './components/list/IList';
import { CloudinaryContext } from 'cloudinary-react';
import { 
  selectHistory, 
  selectTrackHistory, 
  selectCanSave,
  addHistoryPoint,
  backHistoryPoint,
  forwardHistoryPoint,
} from './slices/historySlice';
import { DragDropContext } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const lists: Array<IList> = useSelector(selectLists);
  const historyTodo = useSelector(selectHistory);
  const trackHistory = useSelector(selectTrackHistory);
  const canSave = useSelector(selectCanSave);

  const moveHistory = (e: KeyboardEvent): void => {
    if (e.ctrlKey && e.key === 'z') {
      dispatch(backHistoryPoint());
    } 
    
    if (e.ctrlKey && e.key === 'y') {
      dispatch(forwardHistoryPoint());
    }
  }

  useEffect(() => {
    trackHistory > -1 && dispatch(setLists(historyTodo[trackHistory]));
  }, [trackHistory]);

  useEffect(() => {
    canSave && lists.length && dispatch(addHistoryPoint(lists));
  }, [lists, canSave]);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem(`${CONSTANTS.ID_LOCAL_STORAGE}history`, JSON.stringify(historyTodo));
      localStorage.setItem(`${CONSTANTS.ID_LOCAL_STORAGE}trackHistory`, JSON.stringify(trackHistory));
    });
  }, [historyTodo, trackHistory])

  useEffect(() => {
    window.addEventListener('keydown', (e) => moveHistory(e));
  }, []);

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

  const handleDragEnd = ({ destination, source }: any): void => {
    if (!destination) {
      return;
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }

    dispatch(changePositionDraggingTodo({
      source,
      destination,
    }));
  }

  return(
    <CloudinaryContext cloudName={CONSTANTS.CLOUD_NAME}>
      <ThemeProvider theme={themes[theme]}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <ToolBar />
          <Main />
        </DragDropContext>
      </ThemeProvider>
    </CloudinaryContext>
  )
}

export default App;
