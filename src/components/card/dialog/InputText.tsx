import React, { ChangeEvent, useState } from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import Todo from '../../../utils/Todo';

const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(2),
    width: '99%',
  },
}));

interface IProps {
  todo: Todo | undefined,
}

const InputText: React.FC<IProps> = ({
  todo,
}) => {
  const classes = useStyles();
  const [text, setText] = useState<string>(todo ? todo.text : '');

  const hundleChange = (e: ChangeEvent): void => {
    setText((e.target as HTMLTextAreaElement).value);
  }
  
  return (  
    <TextareaAutosize 
      value={text}
      onChange={hundleChange}
      className={classes.text}
      minRows={3} 
      placeholder='Description'
    />
  )
}

export default InputText;
