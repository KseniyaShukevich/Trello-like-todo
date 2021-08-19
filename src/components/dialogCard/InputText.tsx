import React, { ChangeEvent, useState } from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import Todo from '../card/Todo';
import { useSelector, useDispatch } from 'react-redux';
import { selectBufferTodo, editTodoText } from "../../slices/bufferTodoSlice";

const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(4),
    width: '98.8%',
    [theme.breakpoints.down(1560)]: {
      width: "98.6%",
    },
    [theme.breakpoints.down(1440)]: {
      width: "98.4%",
    },
  },
}));

const InputText: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const todo: Todo | null = useSelector(selectBufferTodo);
  const [text, setText] = useState<string>(todo ? todo.text : '');

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setText(target.value);
    dispatch(editTodoText(target.value));
  }
  
  return (  
    <TextareaAutosize 
      value={text}
      onChange={handleChange}
      className={classes.text}
      minRows={3} 
      placeholder='Description'
    />
  )
}

export default InputText;
