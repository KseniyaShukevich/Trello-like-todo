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
import PlaceCard from "./PlaceCard";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '300px',
    background: alpha(theme.palette.common.white, 0.9),
    position: 'relative',
    transition: '0.5s',
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
  elementLeft: number,
  topNewPosition: number,
  focusedList: string,
  setFocusedList: (value: string) => void,
  focusedTodo: string,
  setFocusedTodo: (value: string) => void,
  idList: string,
  todo: Todo,
  refContainer: any,
  setNextContainer: (value: string) => void,
  setElementHeight1: (value: string) => void,
  elementHeight1: string,
  setElementHeight2: (value: string) => void,
  elementHeight2: string,
}

const Card: React.FC<IProps> = ({
  elementLeft,
  topNewPosition,
  focusedList,
  setFocusedList,
  focusedTodo,
  setFocusedTodo,
  idList,
  todo,
  refContainer,
  setNextContainer,
  setElementHeight1,
  elementHeight1,
  setElementHeight2,
  elementHeight2,
}) => {
  const classes = useStyles();
  const lists = useSelector(selectLists);
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [keyup, setKeyup] = useState<string>('');
  const card = useRef(null);
  // const [isDone, setIsDone] = useState<boolean>(true);
  const [isRight, setIsRight] = useState<boolean>(false);

  const hundleEdit = (): void => {
    setIsHover(false);
    setIsOpen(true);
    dispatch(setBufferTodo(todo));
  }

  const changeFocus = (e: MouseEvent): void => {
    if (focusedTodo === todo.id) {
      setFocusedTodo('');
      setFocusedList('');
    } else {
      setFocusedTodo(todo.id);
      setFocusedList(todo.idList);
      const { height } = window.getComputedStyle(e.currentTarget as HTMLElement);
      setElementHeight1(height);
      setElementHeight2(height);
      const offsetTop: number = (e.currentTarget as HTMLElement).offsetTop;
      const offsetLeft: number = (e.currentTarget as HTMLElement).offsetLeft;
      (e.currentTarget as HTMLElement).style.position = 'absolute';
      (e.currentTarget as HTMLElement).style.zIndex = '90';
      const margin = 8;
      (e.currentTarget as HTMLElement).style.top = offsetTop - margin + 'px';
      (e.currentTarget as HTMLElement).style.left = offsetLeft + 'px';
      // setIsDone(false);
    }
  }

  useEffect(() => {
    if (!(focusedTodo === todo.id)) {
      (card.current! as HTMLElement).style.position = '';
      (card.current! as HTMLElement).style.zIndex = '';
      (card.current! as HTMLElement).style.top = '';
      (card.current! as HTMLElement).style.left = '';
      // setElementHeight1('0');
      // setCardHeight('0');
    }
  }, [focusedTodo]);

  // useEffect(() => {
  //   console.log(topNewPosition)
  //   console.log(isRight)
  //   console.log('keyup:', keyup)
  //   const indexList: number = lists.findIndex((list) => list.id === focusedList);
  //   setNextContainer(lists[indexList + 1].id);

  //   if (isRight && topNewPosition) {
  //     // const indexList: number = lists.findIndex((list) => list.id === focusedList);
  //     if (indexList >- 1 && lists[indexList + 1]) {
  //       // setNextContainer(lists[indexList + 1].id);
  //       console.log(topNewPosition, elementHeight2);
        
  //       (card.current! as HTMLElement).style.top = topNewPosition - parseInt(elementHeight2, 10) + 92 + 'px';
  //       (card.current! as HTMLElement).style.left = 316 * (indexList + 1) + 8 + 'px';
  //       setElementHeight1('0px');
  //       setTimeout(() => {
  //         (card.current! as HTMLElement).style.position = '';
  //         (card.current! as HTMLElement).style.zIndex = '';
  //         (card.current! as HTMLElement).style.top = '';
  //         (card.current! as HTMLElement).style.left = '';
  //         setElementHeight1('0px');
  //         setElementHeight2('0px');
  //         setKeyup('');
  //         console.log(keyup)
  //         console.log('DONE');
  //       }, 1000);
  //     }
  //     setIsRight(false);
  //   }
  // }, [isRight, topNewPosition, focusedTodo]);


  useEffect(() => {
    if (focusedTodo === todo.id) {
      switch (keyup) {
        case 'ArrowRight':
          {
            // setIsRight(true);
            const indexList: number = lists.findIndex((list) => list.id === focusedList);
            // setIsDone(true);
            if (indexList >- 1 && lists[indexList + 1]) {
              setNextContainer(lists[indexList + 1].id);
              (card.current! as HTMLElement).style.top = topNewPosition - parseInt(elementHeight2, 10) + 92 + 'px';
              (card.current! as HTMLElement).style.left = 316 * (indexList + 1) + 8 + 'px';
              setElementHeight1('0px');
              // setTimeout(() => {
              //   (card.current! as HTMLElement).style.position = '';
              //   (card.current! as HTMLElement).style.zIndex = '';
              //   (card.current! as HTMLElement).style.top = '';
              //   (card.current! as HTMLElement).style.left = '';
              //   // setIsDone(true);
              //   setElementHeight1('0px');
              //   setElementHeight2('0px');
              //   setKeyup('');
              //   console.log(keyup)
              //   console.log('DONE');
              //   // setIsDone(true);
              // }, 1000);
            }
            break;
          }
        case 'ArrowLeft':
          break;
        case 'ArrowUp':
          break;
        case 'ArrowDown':
          break;
      }
    }
  }, [keyup, topNewPosition, elementHeight2])

  const onKeyup = (e: KeyboardEvent): void => {
    setKeyup(e.code);
  }

  useEffect(() => {
    window.addEventListener('keyup', (e) => onKeyup(e));
    return window.removeEventListener('keyup', (e) => onKeyup(e));
  }, []);

  return (
    <>
      <Paper 
        ref={card}
        className={classes.card}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onDoubleClick={hundleEdit}
        onClick={(e) => changeFocus(e)}
        style={{
          boxShadow: focusedTodo === todo.id ? '2px 2px 2px red' : '',
        }}
      >
        <DialogCard
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          textButton={'Save'}
          idList={idList}
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
          isHover && (
            <CircleButton 
              onClick={hundleEdit}
              Child={EditIcon}
            />
          )
        }
      </Paper>
      {
        focusedTodo === todo.id && (
          <PlaceCard 
            height={elementHeight1}
          />
        )
      }
    </>
  )
}

export default Card;
