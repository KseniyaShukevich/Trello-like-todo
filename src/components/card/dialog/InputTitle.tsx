import React, { useState, useEffect, ChangeEvent } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Todo from '../../../utils/Todo';
import { useSelector, useDispatch } from 'react-redux';
import { selectBufferTodo, editTodoTitle } from "../../../slices/bufferTodoSlice";

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'block',
    marginTop: theme.spacing(4),
    height: '70px',
  },
}));

interface IProps {
  isError: boolean,
  setIsError: (value: boolean) => void,
}

const InputTitle: React.FC<IProps> = ({
  isError,
  setIsError,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const todo: Todo | null = useSelector(selectBufferTodo);
  const [title, setTitle] = useState<string>(todo ? todo.title : '');

  const hundleChange = (e: ChangeEvent): void => {
    setTitle((e.target as HTMLInputElement).value);
    dispatch(editTodoTitle((e.target as HTMLInputElement).value));
  }
  
  return (
    <TextField 
      required
      error={isError}
      helperText={isError ? "Empty title." : ''}
      value={title}
      onChange={hundleChange}
      className={classes.title}
      onFocus={() => setIsError(false)}
      id="standard-basic" 
      label="Title" 
    />
  )
}

export default InputTitle;
