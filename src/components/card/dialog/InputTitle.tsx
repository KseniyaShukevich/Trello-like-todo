import React from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'block',
    marginTop: theme.spacing(4),
  },
}));

const InputTitle: React.FC = () => {
  const classes = useStyles();
  
  return (
    <TextField 
      className={classes.title}
      id="standard-basic" 
      label="Title" 
    />
  )
}

export default InputTitle;
