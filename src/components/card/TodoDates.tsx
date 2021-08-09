import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Todo from '../../utils/Todo';
import Typography from "@material-ui/core/Typography";

interface IProps {
  todo: Todo,
}

const useStyles = makeStyles((theme) => ({
  date: {
    color: theme.palette.primary.main,
  },
}))

const Dates: React.FC<IProps> = ({
  todo,
}) => {
  const classes = useStyles();

  return (
    <>
      {
        todo.startDate && (
          <>
            <hr/>
            <Typography 
              variant='body2'
              className={classes.date}
            >
              <em>Start date: {todo.startDate}</em>
            </Typography>
          </>
        )
      }

      {
        todo.endDate && (
          <Typography 
            variant='body2'
            className={classes.date}
          >
            <em>End date: {todo.endDate}</em>
          </Typography>
        )
      }
    </>
  )
}

export default Dates;
