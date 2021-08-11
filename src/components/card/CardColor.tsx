import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  todoHeader: {
    height: 35,
    opacity: 0.7,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
  },
}))

interface IProps {
  color: string,
}

const CardColor: React.FC<IProps> = ({
  color,
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.todoHeader}
      style={{
        background: color,
      }}
    />
  )
}

export default CardColor;
