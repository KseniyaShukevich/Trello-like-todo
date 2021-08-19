import React, { useState, ChangeEvent } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Todo from '../card/Todo';
import { useSelector, useDispatch } from 'react-redux';
import { selectBufferTodo, editTodoTitle } from "../../slices/bufferTodoSlice";

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'block',
    marginTop: theme.spacing(4),
    height: '70px',
  },
}));

interface IProps {
  isErrorTitleEmpty: boolean,
  isErrorTitleLonger: boolean,
  setIsErrorTitleEmpty: (value: boolean) => void,
  setIsErrorTitleLonger: (value: boolean) => void,
}

const InputTitle: React.FC<IProps> = ({
  isErrorTitleEmpty,
  isErrorTitleLonger,
  setIsErrorTitleEmpty,
  setIsErrorTitleLonger,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const todo: Todo | null = useSelector(selectBufferTodo);
  const [title, setTitle] = useState<string>(todo ? todo.title : '');

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setTitle(target.value);
    dispatch(editTodoTitle(target.value));
  }

  const handleFocus = (): void => {
    setIsErrorTitleEmpty(false);
    setIsErrorTitleLonger(false);
  }
  
  return (
    <TextField 
      required
      error={isErrorTitleEmpty || isErrorTitleLonger}
      helperText={isErrorTitleEmpty ? "Empty title." : isErrorTitleLonger ? 'Title is too long.' : ''}
      value={title}
      onChange={handleChange}
      className={classes.title}
      onFocus={handleFocus}
      id="standard-basic" 
      label="Title" 
    />
  )
}

export default InputTitle;
