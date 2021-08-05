import React, { MouseEvent, useEffect, useState, useRef, ChangeEvent } from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles, alpha, rgbToHex } from '@material-ui/core/styles';
import Todo from '../../utils/Todo';
import Typography from "@material-ui/core/Typography";
import CircleButton from "../../utils/CircleButton";
import EditIcon from '@material-ui/icons/Edit';
import DialogCard from "./dialog/DialogCard";
import TodoLabels from './TodoLabels';
import TodoDates from './TodoDates';
import { setBufferTodo } from "../../slices/bufferTodoSlice";
import { useDispatch, useSelector } from 'react-redux';
import { selectLists } from '../../slices/listsSlice';
import { moveTodo, swapTodo } from '../../slices/listsSlice';
import List from '../../utils/List';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '300px',
    background: alpha(theme.palette.common.white, 0.9),
    position: 'relative',
    transition: '0.5s',
    marginBottom: theme.spacing(1),
    '&:hover': {
      cursor: 'pointer',
      background: theme.palette.common.white,
    }
  },
  todoHeader: {
    height: '50px',
    opacity: 0.7,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
  },
  container: {
    padding: theme.spacing(2),
  },
  image: {
    height: '150px',
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
  handleDragEnter?: any,
  getStyles?: any,
  isDragging?: boolean,
  handleDragStart?: any,
  todo: Todo,
  focusedList?: string,
  focusedTodo?: string,
  keyup?: string,
  setFocusedList?: (value: string) => void,
  setFocusedTodo?: (value: string) => void,
  setKeyup?: (value: string) => void,
}

const Card: React.FC<IProps> = ({
  handleDragEnter,
  getStyles,
  isDragging,
  handleDragStart,
  focusedList,
  focusedTodo,
  keyup,
  setFocusedList,
  setFocusedTodo,
  setKeyup,
  todo,
}) => {
  const classes = useStyles();
  const lists = useSelector(selectLists);
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const card = useRef(null);

  const hundleEdit = (): void => {
    setIsHover(false);
    setIsOpen(true);
    dispatch(setBufferTodo(todo));
  }

  const changeFocus = (): void => {
    if (setFocusedList && setFocusedTodo) {
      if (focusedTodo === todo.id) {
        setFocusedTodo('');
        setFocusedList('');
      } else {
        setFocusedTodo(todo.id);
        setFocusedList(todo.idList);
      }
    }
  }

  const moveCard = (list: List): void => {
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
        hundleEdit();
      }

      setKeyup('');
    }
  }, [keyup, focusedTodo, focusedList])

  return (
    <>
      <Paper 
        draggable
        onDragStart={(e) => handleDragStart(e)}
        onDragEnter={isDragging ? (e) => handleDragEnter(e) : undefined}
        ref={card}
        className={classes.card}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onDoubleClick={hundleEdit}
        onClick={changeFocus}
        style={{
          boxShadow: focusedTodo === todo.id ? '2px 2px 2px red' : '',
        }}
      >
        <div className={isDragging ? getStyles() : ''} />
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
                    todo.text.length > 350 ? (todo.text.slice(0, 350) + '...') : todo.text
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
              onClick={hundleEdit}
              Child={EditIcon}
            />
          )
        }
      </Paper>
    </>
  )
}

export default Card;
