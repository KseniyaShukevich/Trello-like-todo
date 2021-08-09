import React, { useState, useEffect, useRef, DragEvent } from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectLists, setLists } from '../../slices/listsSlice';
import { setCanSave } from '../../slices/historySlice';
import List from '../../utils/List';
import Todo from '../../utils/Todo';
import ListElement from './List';
import IParams from '../../utils/IParams';

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
  const dragItem = useRef<IParams | null>(null);
  const dragNode = useRef<any>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const pushTodo = (indexList: number) => {
    if (dragItem.current) {
      const newLists: Array<List> = JSON.parse(JSON.stringify(lists));
      const movedTodo: Todo = newLists[dragItem.current.indexList].todos.splice(dragItem.current.indexTodo, 1)[0];

      movedTodo.idList = newLists[indexList].id;
      newLists[indexList].todos.push(movedTodo);
      dispatch(setLists(newLists));
      dragItem.current = { indexList, indexTodo: newLists[indexList].todos.length -1 };
    }
  }

  const getDirection = (e: DragEvent<HTMLDivElement>): string => {
    const cardHeight: number = e.currentTarget.offsetHeight;
    const cardTop: number = e.currentTarget.offsetTop;

    if (e.clientY - cardTop < Math.floor(cardHeight / 2)) {
      return 'top';
    }

    return 'bottom';
  }

  const isPlaceCard = (params: IParams, isNext = true): boolean => {
    const todoPosition: number = isNext ? params.indexTodo + 1 : params.indexTodo - 1;
    const isSameIndexList: boolean = !!dragItem.current && dragItem.current.indexList === params.indexList;
    const isSameIndexTodo: boolean = !!dragItem.current && dragItem.current.indexTodo === todoPosition;
    
    return isSameIndexList && isSameIndexTodo;
  }

  const hasElement = (params: IParams): boolean => {
    const newLists: Array<List> = JSON.parse(JSON.stringify(lists));

    return !!newLists[params.indexList].todos[params.indexTodo + 1];
  }

  const changePosition = (params: IParams) => {
    if (dragItem.current) {
      const newLists: Array<List> = JSON.parse(JSON.stringify(lists));
      const movedTodo: Todo = newLists[dragItem.current.indexList].todos.splice(dragItem.current.indexTodo, 1)[0];

      movedTodo.idList = newLists[params.indexList].id;
      newLists[params.indexList].todos.splice(params.indexTodo, 0, movedTodo);
      dispatch(setLists(newLists));
      dragItem.current = params;
    }
  }

  const handleDragStart = (params: IParams, e: DragEvent<HTMLDivElement>) => {
    dispatch(setCanSave(false));
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  }

  const moveInTop = (params: IParams): void => {
    if (!isPlaceCard(params, false)) {
      changePosition(params);
    }
  }

  const moveInBottom = (params: IParams): void => {
    if (!isPlaceCard(params)) {
      if (hasElement(params)) {
        params.indexTodo += 1;
        changePosition(params);
      } else {
        pushTodo(params.indexList);
      }
    }
  }

  const isSameTodoPosition = (params: IParams): boolean => {
    const isSameIndexList: boolean = !!dragItem.current && dragItem.current.indexList === params.indexList;
    const isSameIndexTodo: boolean = !!dragItem.current && dragItem.current.indexTodo === params.indexTodo;

    return isSameIndexList && isSameIndexTodo;
  }

  const handleDragEnter = (params: IParams, e: DragEvent<HTMLDivElement>): void => {
    if (!isSameTodoPosition(params)) {
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

  const getStyles = (params: IParams): string => {
    const isSameIndexList: boolean | null = dragItem.current && dragItem.current.indexList === params.indexList;
    const isSameIndexTodo: boolean | null = dragItem.current && dragItem.current.indexTodo === params.indexTodo;
    const isSameTodo: boolean | null = isSameIndexList && isSameIndexTodo;

    if (dragItem.current && isSameTodo) {
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
          )
        )
      }
    </>
  )
}

export default Lists;
