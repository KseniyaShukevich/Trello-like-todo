import React from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    display: 'block',
    marginTop: theme.spacing(2),
    width: '100%',
  },
}));

const InputText: React.FC = () => {
  const classes = useStyles();
  
  return (  
    <TextareaAutosize 
      className={classes.text}
      minRows={3} 
      placeholder='Description'
    />
  )
}

export default InputText;
