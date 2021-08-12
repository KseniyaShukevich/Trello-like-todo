import React, { useState, useEffect, useRef, DragEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import IList from './IList';
import List from './List';
import IParams from '../../utils/IParams';
import {
  selectLists, 
  selectListsDragging,
  setListsDragging,
  addDraggingTodoInEnd, 
  setDraggingItem, 
  selectDraggingItem, 
  changePositionDraggingTodo, 
  setLists
} from '../../slices/listsSlice';

const useStyles = makeStyles((theme) => ({
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
  const lists: Array<IList> = useSelector(selectLists);
  const listsDragging: Array<IList> = useSelector(selectListsDragging);
  const draggingItem: IParams | null = useSelector(selectDraggingItem);
  const [keyup, setKeyup] = useState('');
  const [focusedList, setFocusedList] = useState('');
  const [focusedTodo, setFocusedTodo] = useState('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isDropping, setIsDropping] = useState<boolean>(true);
  const dragNode = useRef<any>(null);
  const mousePosition = useRef<number | null>(null);

  const pushTodo = (indexList: number): void => {
    dispatch(addDraggingTodoInEnd(indexList));
  }

  const getDirection = (e: DragEvent<HTMLDivElement>): string => {
    if (mousePosition.current && e.clientY < mousePosition.current) {
      return 'top';
    }

    return 'bottom';
  }

  const isPlaceCard = (params: IParams, isNext = true): boolean => {
    const todoPosition: number = isNext ? params.indexTodo + 1 : params.indexTodo - 1;
    const isSameIndexList: boolean = !!draggingItem && draggingItem.indexList === params.indexList;
    const isSameIndexTodo: boolean = !!draggingItem && draggingItem.indexTodo === todoPosition;
    
    return isSameIndexList && isSameIndexTodo;
  }

  const hasElement = (params: IParams): boolean => {
    const newLists: Array<IList> = JSON.parse(JSON.stringify(listsDragging));

    return !!newLists[params.indexList].todos[params.indexTodo + 1];
  }

  const changePosition = (params: IParams): void => {
    dispatch(changePositionDraggingTodo({ ...params }));
  }

  const moveInTop = (params: IParams): void => {
    if (!isPlaceCard(params, false)) {
      changePosition(params);
    }
  }

  const moveInBottom = (params: IParams): void => {
    if (!isPlaceCard(params)) {
      if (hasElement(params)) {
        changePosition(params);
      } else {
        pushTodo(params.indexList);
      }
    }
  }

  const isSameTodoPosition = (params: IParams): boolean => {
    const isSameIndexList: boolean = !!draggingItem && draggingItem.indexList === params.indexList;
    const isSameIndexTodo: boolean = !!draggingItem && draggingItem.indexTodo === params.indexTodo;

    return isSameIndexList && isSameIndexTodo;
  }

  const handleDragStart = (params: IParams, { target }: DragEvent<HTMLDivElement>): void => {
    dispatch(setListsDragging(lists));
    dispatch(setDraggingItem(params));
    dragNode.current = target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  }

  const handleDragEnter = (params: IParams, e: DragEvent<HTMLDivElement>): void => {
    if (!isSameTodoPosition(params)) {
      const direction: string = getDirection(e);

      if (direction === 'top' && isDropping) {
        setIsDropping(false)
        moveInTop(params);
        setTimeout(() => {
          setIsDropping(true);
        }, 200);
      }

      if (direction === 'bottom' && isDropping) {
        setIsDropping(false)
        moveInBottom(params);
        setTimeout(() => {
          setIsDropping(true);
        }, 200);
      }
    }

    mousePosition.current = e.pageY;
  }

  const handleDragEnd = (): void => {
    dispatch(setDraggingItem(null));
    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragNode.current = null;
    setIsDragging(false);
  }

  useEffect(() => {
    if (!isDragging) {
      const isSameLists: boolean = JSON.stringify(lists) === JSON.stringify(listsDragging);
      
      if (listsDragging.length && !isSameLists) {
        dispatch(setLists(listsDragging));
      }

      dispatch(setListsDragging([]))
    }
  }, [isDragging]);

  const getStyles = (params: IParams): string => {
    const isSameIndexList: boolean = !!draggingItem && draggingItem.indexList === params.indexList;
    const isSameIndexTodo: boolean = !!draggingItem && draggingItem.indexTodo === params.indexTodo;
    const isSameTodo: boolean = isSameIndexList && isSameIndexTodo;

    if (isSameTodo) {
      return classes.draggingCard;
    }

    return '';
  }

  const onKeyup = (e: KeyboardEvent): void => {
    setKeyup(e.code);
  }

  const resetFocus = (e: any) => {
    if (!e.target.closest('.card')) {
      setFocusedList('');
      setFocusedTodo('');
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', onKeyup);

    return () => {
      window.removeEventListener('keyup', onKeyup);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', resetFocus);

    return () => {
      window.removeEventListener('click', resetFocus);
    }
  }, []);

  return (
    <>
      {
        (listsDragging.length && listsDragging || lists).map((list, indexList) => (
          <List
            key={list.id}
            list={list}
            keyup={keyup}
            indexList={indexList}
            isDragging={isDragging}
            focusedList={focusedList}
            focusedTodo={focusedTodo}
            setKeyup={setKeyup}
            getStyles={getStyles}
            handleDragEnterList={pushTodo}
            setFocusedList={setFocusedList}
            setFocusedTodo={setFocusedTodo}
            handleDragStart={handleDragStart}
            handleDragEnter={handleDragEnter}
          />
          )
        )
      }
    </>
  )
}

export default Lists;
