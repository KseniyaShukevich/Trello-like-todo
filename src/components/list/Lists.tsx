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
import ListElement from './List';

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

  const changeTodoPosition = (newLists: Array<List>, params: any) => {
    const currentItem = dragItem.current;
    const movedTodo: Todo = newLists[currentItem.indexList].todos.splice(currentItem.indexTodo, 1)[0];

    movedTodo.idList = newLists[params.indexList].id;
    newLists[params.indexList].todos.splice(params.indexTodo, 0, movedTodo);
    dispatch(setLists(newLists));
    dragItem.current = params;
    previousItem.current = params;
  }

  const isSameTodoPosition = (params: any): boolean => {
    const isSameIndexList: boolean = previousItem.current && previousItem.current.indexList === params.indexList;
    const isSameIndexTodo: boolean = previousItem.current && previousItem.current.indexTodo === params.indexTodo;

    return isSameIndexList && isSameIndexTodo;
  }

  const getPreviousAndNextTodos = (newLists: Array<List>) => {
    const previousIndexList: number = previousItem.current.indexList;
    const previousIndexTodo: number = previousItem.current.indexTodo;
    const previousTodo: Todo = newLists[previousIndexList].todos[previousIndexTodo - 1];
    const nextTodo: Todo = newLists[previousIndexList].todos[previousIndexTodo + 1];

    return [previousTodo, nextTodo];
  }

  const checkPreviousTodo = (e: any, previousTodo: Todo): boolean => {
    const cardHeight: number = e.currentTarget.offsetHeight;
    const cardTop: number = e.currentTarget.offsetTop;
    const isSameTodo: boolean = previousTodo && previousTodo.id === previousItem.current.idTodo;
    const inTopOfTodo: boolean = e.clientY - cardTop < cardHeight / 2;
    
    return isSameTodo && inTopOfTodo;
  }

  const checkNextTodo = (e: any, nextTodo: Todo): boolean => {
    const cardHeight: number = e.currentTarget.offsetHeight;
    const cardTop: number = e.currentTarget.offsetTop;
    const isSameTodo: boolean = nextTodo && nextTodo.id === previousItem.current.idTodo;
    const inBottomOfTodo: boolean = e.clientY - cardTop >= cardHeight / 2;

    return isSameTodo && inBottomOfTodo;
  }

  const checkCursorPosition = (e: any, newLists: Array<List>, params: any): void => {
    const [previousTodo, nextTodo] = getPreviousAndNextTodos(newLists);

    checkPreviousTodo(e, previousTodo) && changeTodoPosition(newLists, params);
    checkNextTodo(e, nextTodo) && changeTodoPosition(newLists, params);
  }

  const pushTodo = (indexList: number) => {
    const currentItem = dragItem.current;
    const newLists: Array<List> = JSON.parse(JSON.stringify(lists));
    const movedTodo: Todo = newLists[currentItem.indexList].todos.splice(currentItem.indexTodo, 1)[0];

    movedTodo.idList = newLists[indexList].id;
    newLists[indexList].todos.push(movedTodo);
    dispatch(setLists(newLists));
    dragItem.current = { indexList, indexTodo: newLists[indexList].todos.length -1 };
    previousItem.current = { indexList, indexTodo: newLists[indexList].todos.length -1 };
  }

  const handleDragEnterList = (indexList: number, e: any): void => {
    const isSameIndexList: boolean = previousItem.current && previousItem.current.indexList === indexList;
    const isDifferentNode: boolean = e.currentTarget !== dragNode.current;

    if ((!previousItem.current || !isSameIndexList) && isDifferentNode) {
      pushTodo(indexList);
    }
  }

  const handleDragStart = (params: any, e: any) => {
    dispatch(setCanSave(false));
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  }

  const checkInitCursorPosition = (e: any, newLists: Array<List>, params: any) => {
    const cardHeight = e.currentTarget.offsetHeight;
    const cardTop = e.currentTarget.offsetTop;
    const isDraggingInTop: boolean = dragItem.current.indexList === params.indexList && dragItem.current.indexTodo === params.indexTodo - 1;
    const isDraggingInBottom: boolean = dragItem.current.indexList === params.indexList && dragItem.current.indexTodo === params.indexTodo + 1;

    if (e.clientY - cardTop < cardHeight / 2 && !isDraggingInTop) {
      // console.log('TOP CHANGE')
      changeTodoPosition(newLists, params);
    }

    if (e.clientY - cardTop >= cardHeight / 2 && !isDraggingInBottom) {
      if (newLists[params.indexList].todos[params.indexTodo + 1]) {
        params.indexTodo += 1;
        // console.log('BOTTON CHANGE')
        changeTodoPosition(newLists, params);
      } else {
        // console.log('BOTTON CHANGE')
        pushTodo(params.indexList);
      }
    }
  }

  const handleDragEnter = (params: any, e: any): void => {
    if ((!previousItem.current || !isSameTodoPosition(params))) {
      const newLists: Array<List> = JSON.parse(JSON.stringify(lists));
      console.log(previousItem.current);
      console.log(isSameTodoPosition(params));

      if (previousItem.current && previousItem.current.idTodo === params.idTodo) {
        // console.log('CHECH CURSOR')
        checkCursorPosition(e, newLists, params);
      } else {
        // console.log('CHECK INIT CURSOR')
        checkInitCursorPosition(e, newLists, params);
      }
    }
  }

  const handleDragEnd = () => {
    dragItem.current = null;
    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragNode.current = null;
    previousItem.current = null;
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
          <ListElement
            key={list.id}
            list={list}
            focusedList={focusedList}
            focusedTodo={focusedTodo}
            setFocusedList={setFocusedList}
            setFocusedTodo={setFocusedTodo}
            keyup={keyup}
            setKeyup={setKeyup}
            isDragging={isDragging}
            indexList={indexList}
            handleDragStart={handleDragStart}
            handleDragEnter={handleDragEnter}
            handleDragEnterList={handleDragEnterList}
            getStyles={getStyles}
          />
          // <div 
          //   key={list.id}
          //   style={{
          //     height: '100%',
          //   }}
          // >
          // <div
          //   key={list.id}
          //   onDragEnter={(isDragging && !list.todos.length ? (e: any) => handleDragEnter({ indexList, indexTodo: 0 }, e) : null) as any}
          //   className={classes.list}
          // >
          //   <ListName
          //     list={list}
          //   />
          //   <div 
          //     className={classes.scroll}
          //   >

          //     {list.todos.map((todo, indexTodo) => (
          //       <Card 
          //         key={todo.id}
          //         handleDragEnter={handleDragEnter.bind(undefined, { indexList, indexTodo, idTodo: todo.id })}
          //         isDragging={isDragging}
          //         getStyles={getStyles.bind(undefined, { indexList, indexTodo })}
          //         handleDragStart={handleDragStart.bind(undefined, { indexList, indexTodo, idTodo: todo.id })}
          //         todo={todo}
          //         focusedList={focusedList}
          //         focusedTodo={focusedTodo}
          //         keyup={keyup}
          //         setFocusedList={setFocusedList}
          //         setFocusedTodo={setFocusedTodo}
          //         setKeyup={setKeyup}
          //       />
          //     ))}

          //    </div>
          //   <AddCard 
          //     idList={list.id}
          //   />
          // </div>
          // <div
          //   onDragEnter={(isDragging ? (e: any) => handleDragEnterList(indexList, e) : null) as any}
          //   style={{
          //     height: '100%',
          //   }}
          // />
          // </div>
          )
        )
      }
    </>
  )
}

export default Lists;
