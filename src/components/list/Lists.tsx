import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectLists, setLists } from '../../slices/listsSlice';
import { setCanSave } from '../../slices/historySlice';
import ListName from './ListName';
import AddCard from '../card/AddCard';
import Card from '../card/Card';
import List from '../../utils/List';
import Todo from '../../utils/Todo';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '8px',
      backgroundColor: alpha(theme.palette.secondary.main, 0.3),
      borderRadius: theme.shape.borderRadius,
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
      boxShadow: 'inset 1px 1px 10px #f3faf7',
    },
  },
  list: {
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  scroll: {
    overflowY: 'auto',
    maxHeight: '80vh',
    marginBottom: theme.spacing(1),
    paddingRight: theme.spacing(0.5),
  },
  draggingCard: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
    background: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
  },
}))

const Lists: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const lists = useSelector(selectLists);
  const [focusedList, setFocusedList] = useState('');
  const [focusedTodo, setFocusedTodo] = useState('');
  const [keyup, setKeyup] = useState('');
  const dragItem = useRef<any>(null);
  const dragNode = useRef<any>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const previousItem = useRef<any>(null);

  const handleDragStart = (params: any, e: any) => {
    dispatch(setCanSave(false));
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  }

  const handleDragEnter = (params: any, e: any) => {
    const currentItem = dragItem.current;
    const isSameIndexList = previousItem.current && previousItem.current.indexList === params.indexList;
    const isSameIndexTodo = previousItem.current && previousItem.current.indexTodo === params.indexTodo;
    const isSameTodo = previousItem.current && isSameIndexList && isSameIndexTodo;

    if ((!previousItem.current || !isSameTodo) && e.currentTarget !== dragNode.current) {
      const newLists: Array<List> = JSON.parse(JSON.stringify(lists));
      const movedTodo: Todo = newLists[currentItem.indexList].todos.splice(currentItem.indexTodo, 1)[0];
      movedTodo.idList = newLists[params.indexList].id;

      newLists[params.indexList].todos.splice(params.indexTodo, 0, movedTodo);
      dispatch(setLists(newLists));
      dragItem.current = params;
      previousItem.current = params;
    }
  }

  const handleDragEnterList = (indexList: number, e: any) => {
    const currentItem = dragItem.current;
    const isSameIndexList = previousItem.current && previousItem.current.indexList === indexList;

    if ((!previousItem.current || !isSameIndexList) && e.currentTarget !== dragNode.current) {
      const newLists: Array<List> = JSON.parse(JSON.stringify(lists));
      const movedTodo: Todo = newLists[currentItem.indexList].todos.splice(currentItem.indexTodo, 1)[0];
      movedTodo.idList = newLists[indexList].id;

      newLists[indexList].todos.push(movedTodo);
      dispatch(setLists(newLists));
      dragItem.current = { indexList, indexTodo: newLists[indexList].todos.length -1 };
      previousItem.current = { indexList, indexTodo: newLists[indexList].todos.length -1 };
    }
  }

  const handleDragEnd = () => {
    dragItem.current = null;
    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragNode.current = null;
    setIsDragging(false);
    dispatch(setCanSave(true));
  }

  const getStyles = (params: any) => {
    const currentItem = dragItem.current;
    if ((currentItem.indexList === params.indexList) && (currentItem.indexTodo === params.indexTodo)) {
      return classes.draggingCard;
    }

    return '';
  }

  const onKeyup = (e: KeyboardEvent): void => {
    setKeyup(e.code);
  }

  useEffect(() => {
    window.addEventListener('keyup', (e) => onKeyup(e));
  }, []);

  return (
    <>
      {
        lists.map((list, indexList) => (
          <div 
            key={list.id}
            style={{
              height: '100%',
            }}
          >
          <div
            key={list.id}
            onDragEnter={(isDragging && !list.todos.length ? (e: any) => handleDragEnter({ indexList, indexTodo: 0 }, e) : null) as any}
            className={classes.list}
          >
            <ListName
              list={list}
            />
            <div 
              className={classes.scroll}
            >

              {list.todos.map((todo, indexTodo) => (
                <Card 
                  key={todo.id}
                  handleDragEnter={handleDragEnter.bind(undefined, { indexList, indexTodo })}
                  isDragging={isDragging}
                  getStyles={getStyles.bind(undefined, { indexList, indexTodo })}
                  handleDragStart={handleDragStart.bind(undefined, { indexList, indexTodo })}
                  todo={todo}
                  focusedList={focusedList}
                  focusedTodo={focusedTodo}
                  keyup={keyup}
                  setFocusedList={setFocusedList}
                  setFocusedTodo={setFocusedTodo}
                  setKeyup={setKeyup}
                />
              ))}

             </div>
            <AddCard 
              idList={list.id}
            />
          </div>
          <div
            onDragEnter={(isDragging ? (e: any) => handleDragEnterList(indexList, e) : null) as any}
            style={{
              height: '100%',
            }}
          />
          </div>
          )
        )
      }
    </>
  )
}

export default Lists;
