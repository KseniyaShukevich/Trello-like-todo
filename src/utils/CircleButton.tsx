import React from "react";
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(0.6),
  },
}))

interface IProps {
  onClick: any,
  Child: any,
}

const CircleButton: React.FC<IProps> = ({
  onClick,
  Child,
}) => {
  const classes = useStyles();

  return (
    <IconButton 
      className={classes.button} 
      size='small'
      onClick={onClick}
    >
      <Child fontSize="small" />
    </IconButton>
  )
}

export default CircleButton;
