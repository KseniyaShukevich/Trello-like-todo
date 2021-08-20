import React, { useEffect, useState, useRef, DragEvent, MouseEvent } from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles, alpha } from '@material-ui/core/styles';
import Todo from './Todo';
import CircleButton from "../../utils/CircleButton";
import EditIcon from '@material-ui/icons/Edit';
import DialogCard from "../dialogCard/DialogCard";
import CardLabels from './CardLabels';
import CardDates from './CardDates';
import { setBufferTodo } from "../../slices/bufferTodoSlice";
import { useDispatch, useSelector } from 'react-redux';
import { selectLists } from '../../slices/listsSlice';
import { moveTodo, swapTodo } from '../../slices/listsSlice';
import IList from '../list/IList';
import CardColor from "./CardColor";
import CardImage from './CardImage';
import CardText from './CardText';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 250,
    background: alpha(theme.palette.common.white, 0.9),
    position: 'relative',
    transition: '0.3s',
    marginBottom: theme.spacing(1),
    border: `1px solid grey`,
    boxSizing: 'border-box',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
      background: theme.palette.common.white,
    }
  },
  container: {
    padding: theme.spacing(1),
  },
}))

interface IProps {
  todo: Todo,
  listNode?: any,
  keyup?: string | undefined,
  isDragging?: boolean | undefined,
  focusedList?: string | undefined,
  focusedTodo?: string | undefined,
  getStyles?: (() => string) | undefined,
  setKeyup?: ((value: string) => void) | undefined,
  setFocusedList?: ((value: string) => void) | undefined,
  setFocusedTodo?: ((value: string) => void) | undefined,
  handleDragEnter?: ((e: DragEvent<HTMLDivElement>) => void) | undefined,
  handleDragStart?: ((e: DragEvent<HTMLDivElement>) => void) | undefined,
}

const Card: React.FC<IProps> = ({
  todo,
  listNode,
  keyup,
  isDragging,
  focusedList,
  focusedTodo,
  getStyles,
  setKeyup,
  setFocusedList,
  setFocusedTodo,
  handleDragEnter,
  handleDragStart,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const lists: Array<IList> = useSelector(selectLists);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const card = useRef<HTMLElement | null>(null);

  const handleEdit = (e: MouseEvent | null = null): void => {
    e && e.stopPropagation();
    setIsHover(false);
    setIsOpen(true);
    // dispatch(setBufferTodo(todo));
  }

  const scrollVertical = (): void => {
    if (card.current) {
      const scrollTop: number = listNode.current.scrollTop;
      const listHeight: number = listNode.current.clientHeight;
      const cardTop: number = card.current.offsetTop - 100;
      const cardHeight: number = card.current.offsetHeight;
      const cardBottom: number = cardTop + cardHeight;

      if (cardTop < scrollTop) {
        listNode.current.scrollTop = cardTop;
      }

      if (cardBottom > scrollTop + listHeight) {
        listNode.current.scrollTop += cardBottom - listHeight - scrollTop;
      }
    }
  }

  const scrollHorizontal = (): void => {
    if (card.current) {
      const root = document.querySelector('#root');

      if (root) {
        const cardLeft: number = card.current.offsetLeft;
        const cardWidth: number = card.current.offsetWidth;
        const screenWidth: number = root.clientWidth;
        const scrollLeft: number = root.scrollLeft;
        const cardSum: number = cardLeft + cardWidth;
        const windowSum: number = scrollLeft + screenWidth;

        if (cardLeft < scrollLeft) {
          root.scrollLeft = cardLeft;
        }

        if (cardSum > windowSum) {
          root.scrollLeft += cardSum - windowSum;
        }
      }
    }
  }

  const scroll = (): void => {
    scrollVertical();
    scrollHorizontal();
  }

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    handleDragStart && handleDragStart(e);
    scroll();
  }

  const changeFocus = (): void => {
    if (setFocusedList && setFocusedTodo) {
      if (focusedTodo === todo.id) {
        setFocusedTodo('');
        setFocusedList('');
      } else {
        setFocusedTodo(todo.id);
        setFocusedList(todo.idList);
        scroll();
      }
    }
  }

  const moveCard = (list: IList): void => {
    if (setFocusedList) {
      if (list) {
        dispatch(moveTodo({
          idList: list.id,
          todo,
        }));

        setFocusedList(list.id);
      }
    }
  }

  const swapCards = (isDown = false) => {
    dispatch(swapTodo({
      isDown,
      todo,
    }));
  }

  const onMouseEnter = (): void => {
    setIsHover(true);
  }

  const onMouseLeave = (): void => {
    setIsHover(false);
  }

  useEffect(() => {
    if (focusedTodo === todo.id && setKeyup) {
      const indexList: number = lists.findIndex((list) => list.id === focusedList);

      if (keyup === 'ArrowRight') {
        moveCard(lists[indexList + 1]);
      }

      if (keyup === 'ArrowLeft') {
        moveCard(lists[indexList - 1]);
      }

      if (keyup === 'ArrowDown') {
        swapCards(true);
      }

      if (keyup === 'ArrowUp') {
        swapCards();
      }

      if (keyup === 'Enter') {
        handleEdit();
      }

      scroll();
      setKeyup('');
    }
  }, [keyup, focusedTodo, focusedList])

  const onDragEnter = (e: DragEvent<HTMLDivElement>): void => {
    if (isDragging && handleDragEnter) {
      handleDragEnter(e);
    }
  }

  const getClassName = (): string => {
    if (isDragging && getStyles) {
      return getStyles();
    }

    return '';
  }

  const getBorderColor = (): string => {
    return focusedTodo === todo.id ? 'red' : '';
  }

  return (
    <>
      <DialogCard
        isOpen={isOpen}
        todo={todo}
        setIsOpen={setIsOpen}
        textButton={'Save'}
        idList={todo.idList}
      />
      <Paper
        draggable
        ref={card}
        className={classes.card + ' card'}
        style={{
          borderColor: getBorderColor(),
        }}
        onDragStart={(e) => onDragStart(e)}
        onDragEnter={onDragEnter}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onDoubleClick={(e) => handleEdit(e)}
        onClick={changeFocus}
      >
        <div className={getClassName()} />
        {
          todo.color && (
            <CardColor
              color={todo.color}
            />
          )
        }
        {
          !!todo.images.length && (
            <CardImage
              url={todo.images[0].url}
            />
          )
        }
        <div className={classes.container}>
          <CardLabels
            labels={todo.labels}
          />
          <CardText
            title={todo.title}
            text={todo.text}
          />
          <CardDates
            todo={todo}
          />
        </div>
        {
          isHover && setFocusedTodo && (
            <CircleButton
              onClick={(e: MouseEvent) => handleEdit(e)}
              Child={EditIcon}
            />
          )
        }
      </Paper>
    </>
  )
}

export default Card;
