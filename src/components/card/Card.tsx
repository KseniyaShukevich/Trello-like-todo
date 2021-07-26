import React, { useState } from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles, alpha } from '@material-ui/core/styles';
import Todo from '../../utils/Todo';
import Typography from "@material-ui/core/Typography";
import CircleButton from "../../utils/CircleButton";
import EditIcon from '@material-ui/icons/Edit';
import DialogCard from "./dialog/DialogCard";
import TodoLabels from './TodoLabels';
import TodoDates from './TodoDates';
import { useDispatch } from 'react-redux';
import { setBufferTodo } from "../../slices/bufferTodoSlice";

const useStyles = makeStyles((theme) => ({
  containerCard: {
    marginTop: theme.spacing(1),
  },
  card: {
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
}))

interface IProps {
  idList: string,
  todo: Todo,
}

const Card: React.FC<IProps> = ({
  idList,
  todo,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hundleEdit = (): void => {
    setIsHover(false);
    setIsOpen(true);
    dispatch(setBufferTodo(todo));
  }

  return (
    <div className={classes.containerCard}>
      <Paper 
        className={classes.card}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onDoubleClick={hundleEdit}
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
                <Typography variant='body1'>
                  {todo.text}
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
    </div>
  )
}

export default Card;
