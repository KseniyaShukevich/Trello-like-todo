import React, { useState, useEffect } from "react";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import CircleButton from "../../../utils/CircleButton";
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { selectBufferTodo, editTodoStartDate, editTodoEndDate, deleteTodoStartDate, deleteTodoEndDate } from "../../../slices/bufferTodoSlice";
import Todo from '../../../utils/Todo';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  containerData: {
    width: '300px',
    position: 'relative',
  },
  containerAddButton: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));

interface IProps {
  isStartDate: boolean,
  text: string,
  className?: any,
}

const StartDate: React.FC<IProps> = ({
  isStartDate,
  text,
  className,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const todo: Todo | null = useSelector(selectBufferTodo);
  const [date, setDate] = useState<string>(
      isStartDate ? 
      (todo?.startDate ? todo.startDate : moment().format('YYYY-MM-DD')) 
      : 
      (todo?.endDate ? todo.endDate : moment().format('YYYY-MM-DD'))
    );
  const [isDate, setIsDate] = useState<boolean>(isStartDate ? !!todo?.startDate : !!todo?.endDate);

  const changeDate = (date: Date | null): void => {
    date && setDate(moment(date).format('YYYY-MM-DD'));
  }

  const addDate = (): void => {
    setDate(new Date().toString());
    setIsDate(true);
  }

  const deleteData = (): void => {
    setIsDate(false);
  }

  useEffect(() => {
    if (isDate) {
      if (isStartDate) {
        dispatch(editTodoStartDate(date?.toString()));
      } else {
        dispatch(editTodoEndDate(date?.toString()));
      }
    } else {
      if (isStartDate) {
        dispatch(deleteTodoStartDate());
      } else {
        dispatch(deleteTodoEndDate());
      }
    }
  }, [date, isDate]);

  return (
    <>
      {
        isDate ? (
          <div className={classes.containerData}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={className}
                margin="normal"
                id="date-picker-dialog"
                label={text}
                format="MM/dd/yyyy"
                value={date}
                onChange={changeDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <CircleButton 
              Child={CloseIcon}
              onClick={deleteData}
            />
          </div>
        ) : (
          <div className={classes.containerAddButton}>
            <Typography variant='body1'>
              Add {text.toLowerCase()}
            </Typography>
            <IconButton
              className={classes.button}
              onClick={addDate}
            >
              <AddIcon />
            </IconButton>
          </div>
        )
      }
    </>
  )
}

export default StartDate;
