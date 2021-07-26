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
  },
}));

const InputTitle: React.FC = () => {
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
      value={title}
      onChange={hundleChange}
      className={classes.title}
      id="standard-basic" 
      label="Title" 
    />
  )
}

export default InputTitle;
