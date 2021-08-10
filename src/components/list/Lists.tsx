import React, { useState, useEffect, useRef, DragEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setCanSave } from '../../slices/historySlice';
import IList from './IList';
import List from './List';
import IParams from '../../utils/IParams';
import {
  selectLists, 
  addDraggingTodoInEnd, 
  setDraggingItem, 
  selectDraggingItem, 
  changePositionDraggingTodo 
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
  const lists = useSelector(selectLists);
  const [keyup, setKeyup] = useState('');
  const [focusedList, setFocusedList] = useState('');
  const [focusedTodo, setFocusedTodo] = useState('');
  // const draggingItem = useSelector(selectDraggingItem);
  // const [isDragging, setIsDragging] = useState<boolean>(false);
  // const dragNode = useRef<any>(null);

  const pushTodo = (indexList: number): void => {
    dispatch(addDraggingTodoInEnd(indexList));
  }

  // const getDirection = (e: DragEvent<HTMLDivElement>): string => {
  //   const cardHeight: number = e.currentTarget.offsetHeight;
  //   const cardTop: number = e.currentTarget.offsetTop;

  //   if (e.clientY - cardTop < Math.floor(cardHeight / 2)) {
  //     return 'top';
  //   }

  //   return 'bottom';
  // }

  // const isPlaceCard = (params: IParams, isNext = true): boolean => {
  //   const todoPosition: number = isNext ? params.indexTodo + 1 : params.indexTodo - 1;
  //   const isSameIndexList: boolean = !!draggingItem && draggingItem.indexList === params.indexList;
  //   const isSameIndexTodo: boolean = !!draggingItem && draggingItem.indexTodo === todoPosition;
    
  //   return isSameIndexList && isSameIndexTodo;
  // }

  // const hasElement = (params: IParams): boolean => {
  //   const newLists: Array<IList> = JSON.parse(JSON.stringify(lists));

  //   return !!newLists[params.indexList].todos[params.indexTodo + 1];
  // }

  // const changePosition = (params: IParams): void => {
  //   dispatch(changePositionDraggingTodo({ ...params }));
  // }

  // const moveInTop = (params: IParams): void => {
  //   if (!isPlaceCard(params, false)) {
  //     changePosition(params);
  //   }
  // }

  // const moveInBottom = (params: IParams): void => {
  //   if (!isPlaceCard(params)) {
  //     if (hasElement(params)) {
  //       params.indexTodo += 1;
  //       changePosition(params);
  //     } else {
  //       pushTodo(params.indexList);
  //     }
  //   }
  // }

  // const isSameTodoPosition = (params: IParams): boolean => {
  //   const isSameIndexList: boolean = !!draggingItem && draggingItem.indexList === params.indexList;
  //   const isSameIndexTodo: boolean = !!draggingItem && draggingItem.indexTodo === params.indexTodo;

  //   return isSameIndexList && isSameIndexTodo;
  // }

  // const handleDragStart = (params: IParams, e: DragEvent<HTMLDivElement>): void => {
  //   dispatch(setCanSave(false));
  //   dispatch(setDraggingItem(params));
  //   dragNode.current = e.target;
  //   dragNode.current.addEventListener('dragend', handleDragEnd);
  //   setTimeout(() => {
  //     setIsDragging(true);
  //   }, 0);
  // }

  // const handleDragEnter = (params: IParams, e: DragEvent<HTMLDivElement>): void => {
  //   if (!isSameTodoPosition(params)) {
  //     const direction: string = getDirection(e);

  //     if (direction === 'top') {
  //       moveInTop(params);
  //       return;
  //     }

  //     if (direction === 'bottom') {
  //       moveInBottom(params);
  //     }
  //   }
  // }

  // const handleDragEnd = (): void => {
  //   dispatch(setDraggingItem(null));
  //   dragNode.current.removeEventListener('dragend', handleDragEnd);
  //   dragNode.current = null;
  //   setIsDragging(false);
  //   dispatch(setCanSave(true));
  // }

  // const getStyles = (params: IParams): string => {
  //   const isSameIndexList: boolean = !!draggingItem && draggingItem.indexList === params.indexList;
  //   const isSameIndexTodo: boolean = !!draggingItem && draggingItem.indexTodo === params.indexTodo;
  //   const isSameTodo: boolean = isSameIndexList && isSameIndexTodo;

  //   if (isSameTodo) {
  //     return classes.draggingCard;
  //   }

  //   return '';
  // }

  const onKeyup = (e: KeyboardEvent): void => {
    setKeyup(e.code);
  }

  useEffect(() => {
    window.addEventListener('keyup', (e) => onKeyup(e));

    return () => {
      window.removeEventListener('keyup', (e) => onKeyup(e));
    }
  }, []);

  return (
    <>
      {
        lists.map((list, indexList) => (
          <List
            key={list.id}
            list={list}
            keyup={keyup}
            indexList={indexList}
            // isDragging={isDragging}
            focusedList={focusedList}
            focusedTodo={focusedTodo}
            setKeyup={setKeyup}
            // getStyles={getStyles}
            handleDragEnterList={pushTodo}
            setFocusedList={setFocusedList}
            setFocusedTodo={setFocusedTodo}
            // handleDragStart={handleDragStart}
            // handleDragEnter={handleDragEnter}
          />
          )
        )
      }
    </>
  )
}

export default Lists;
