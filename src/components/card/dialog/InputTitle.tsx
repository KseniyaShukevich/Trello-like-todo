import React, { useState, useEffect, ChangeEvent } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Todo from '../../../utils/Todo';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'block',
    marginTop: theme.spacing(4),
  },
}));

interface IProps {
  // listId: string,
  todo: Todo | undefined,
}

const InputTitle: React.FC<IProps> = ({
  // listId,
  todo,
}) => {
  const classes = useStyles();
  const [title, setTitle] = useState<string>(todo ? todo.title : '');

  const hundleChange = (e: ChangeEvent): void => {
    setTitle((e.target as HTMLInputElement).value);
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
