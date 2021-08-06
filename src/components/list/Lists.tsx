import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectLists, setLists } from '../../slices/listsSlice';
import { setCanSave } from '../../slices/historySlice';
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

  const pushTodo = (indexList: number) => {
    const currentItem = dragItem.current;
    const newLists: Array<List> = JSON.parse(JSON.stringify(lists));
    const movedTodo: Todo = newLists[currentItem.indexList].todos.splice(currentItem.indexTodo, 1)[0];

    movedTodo.idList = newLists[indexList].id;
    newLists[indexList].todos.push(movedTodo);
    dispatch(setLists(newLists));
    dragItem.current = { indexList, indexTodo: newLists[indexList].todos.length -1 };
  }

  const getDirection = (e: any): string => {
    const cardHeight: number = e.currentTarget.offsetHeight;
    const cardTop: number = e.currentTarget.offsetTop;

    if (e.clientY - cardTop < Math.floor(cardHeight / 2)) {
      return 'top';
    }

    return 'bottom';
  }

  const isPreviousPlaceCard = (params: any): boolean => {
    const isSameIndexList = dragItem.current.indexList === params.indexList;
    const isSameIndexTodo = dragItem.current.indexTodo === params.indexTodo - 1;
    
    return isSameIndexList && isSameIndexTodo;
  }

  const isNextPlaceCard = (params: any): boolean => {
    const isSameIndexList = dragItem.current.indexList === params.indexList;
    const isSameIndexTodo = dragItem.current.indexTodo === params.indexTodo + 1;
    
    return isSameIndexList && isSameIndexTodo
  }

  const hasElement = (params: any): boolean => {
    const newLists: Array<List> = JSON.parse(JSON.stringify(lists));

    return !!newLists[params.indexList].todos[params.indexTodo + 1];
  }

  const changePosition = (params: any) => {
    const newLists: Array<List> = JSON.parse(JSON.stringify(lists));
    const currentItem = dragItem.current;
    const movedTodo: Todo = newLists[currentItem.indexList].todos.splice(currentItem.indexTodo, 1)[0];

    movedTodo.idList = newLists[params.indexList].id;
    newLists[params.indexList].todos.splice(params.indexTodo, 0, movedTodo);
    dispatch(setLists(newLists));
    dragItem.current = params;
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

  const moveInTop = (params: any): void => {
    if (!isPreviousPlaceCard(params)) {
      changePosition(params);
    }
  }

  const moveInBottom = (params: any): void => {
    if (!isNextPlaceCard(params)) {
      if (hasElement(params)) {
        params.indexTodo += 1;
        changePosition(params);
      } else {
        pushTodo(params.indexList);
      }
    }
  }

  const handleDragEnter = (params: any, e: any): void => {
    const isSameIndexList = dragItem.current.indexList === params.indexList;
    const isSameIndexTodo = dragItem.current.indexTodo === params.indexTodo;
    const isSameTodoPosition: boolean = isSameIndexList && isSameIndexTodo;

    if (!isSameTodoPosition) {
      const direction: string = getDirection(e);

      if (direction === 'top') {
        moveInTop(params);
        return;
      }

      if (direction === 'bottom') {
        moveInBottom(params);
      }
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
            handleDragEnterList={pushTodo}
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
