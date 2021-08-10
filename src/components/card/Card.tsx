import React, { useEffect, useState, useRef, DragEvent } from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles, alpha } from '@material-ui/core/styles';
import Todo from './Todo';
import Typography from "@material-ui/core/Typography";
import CircleButton from "../../utils/CircleButton";
import EditIcon from '@material-ui/icons/Edit';
import DialogCard from "../dialogCard/DialogCard";
import TodoLabels from './TodoLabels';
import TodoDates from './TodoDates';
import { setBufferTodo } from "../../slices/bufferTodoSlice";
import { useDispatch, useSelector } from 'react-redux';
import { selectLists } from '../../slices/listsSlice';
import { moveTodo, swapTodo } from '../../slices/listsSlice';
import IList from '../list/IList';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 250,
    background: alpha(theme.palette.common.white, 0.9),
    position: 'relative',
    transition: '0.3s',
    border: `1px solid grey`,
    boxSizing: 'border-box',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
      background: theme.palette.common.white,
    }
  },
  todoHeader: {
    height: 35,
    opacity: 0.7,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
  },
  container: {
    padding: theme.spacing(1),
  },
  image: {
    height: 130,
  },
  title: {
    fontWeight: 'bold',
    marginRight: theme.spacing(4),
    color: theme.palette.primary.main,
  },
  text: {
    wordWrap: 'break-word', 
  },
}))

interface IProps {
  todo: Todo,
  listNode?: any,
  keyup?: string | undefined,
  focusedList?: string | undefined,
  focusedTodo?: string | undefined,
  setKeyup?: ((value: string) => void) | undefined,
  setFocusedList?: ((value: string) => void) | undefined,
  setFocusedTodo?: ((value: string) => void) | undefined,
}

const Card: React.FC<IProps> = ({
  todo,
  listNode,
  keyup,
  focusedList,
  focusedTodo,
  setKeyup,
  setFocusedList,
  setFocusedTodo,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const lists = useSelector(selectLists);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const card = useRef<any>(null);

  const handleEdit = (): void => {
    setIsHover(false);
    setIsOpen(true);
    dispatch(setBufferTodo(todo));
  }

  // const scrollList = (): void => {
  //   const scrollTop: number = listNode.current.scrollTop;
  //   const listHeight: number = listNode.current.clientHeight;
  //   const cardTop: number = card.current.offsetTop - 100; 
  //   const cardHeight: number = card.current.offsetHeight;
  //   const cardBottom: number = cardTop + cardHeight;

  //   if (cardTop < scrollTop) {
  //     listNode.current.scrollTop = cardTop;
  //   } 

  //   if (cardBottom > scrollTop + listHeight) {
  //     listNode.current.scrollTop += cardBottom - listHeight - scrollTop;
  //   }
  // }

  const changeFocus = (): void => {
    if (setFocusedList && setFocusedTodo) {
      if (focusedTodo === todo.id) {
        setFocusedTodo('');
        setFocusedList('');
      } else {
        setFocusedTodo(todo.id);
        setFocusedList(todo.idList);
        // scrollList();
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

  const getFormattedText = (text: string): string => {
    return text.length > 350 ? (text.slice(0, 350) + '...') : text;
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

      // scrollList();
      setKeyup('');
    }
  }, [keyup, focusedTodo, focusedList])

  return (
    <>
      <Paper 
        ref={card}
        className={classes.card}
        style={{
          borderColor: focusedTodo === todo.id ? 'red' : '',
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onDoubleClick={handleEdit}
        onClick={changeFocus}
      >
        <div />
        <DialogCard
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          textButton={'Save'}
          idList={todo.idList}
        />
        {
          todo.color && (
            <div
              className={classes.todoHeader}
              style={{
                background: todo.color,
              }}
            />
          )
        }
        {
          !!todo.images.length && (
            <div
              className={classes.image}
              style={{
                background: `url(${todo.images[0].url}) center center / cover`,
              }}
            />
          )
        }
        <div className={classes.container}>
          <TodoLabels 
            todo={todo}
          />
          <Typography 
            variant='subtitle1'
            className={classes.title}
          >
            {todo.title}
          </Typography>
          {
            todo.text && (
              <>
                <hr/>
                <Typography
                  variant='body1'
                  className={classes.text}
                >
                  {
                    getFormattedText(todo.text)
                  }
                </Typography>
              </>
            )
          }
          <TodoDates 
            todo={todo}
          />
        </div>
        {
          isHover && setFocusedTodo && (
            <CircleButton 
              onClick={handleEdit}
              Child={EditIcon}
            />
          )
        }
      </Paper>
    </>
  )
}

export default Card;
