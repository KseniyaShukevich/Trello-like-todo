import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Todo from '../../utils/Todo';

const useStyles = makeStyles((theme) => ({
  containerLabels: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  label: {
    width: '50px',
    height: '10px',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    opacity: 0.7,
  },
  hrLabels: {
    marginTop: 0,
  },
}))

interface IProps {
  todo: Todo,
}

const TodoLabels: React.FC<IProps> = ({
  todo,
}) => {
  const classes = useStyles();

  return (
    <>
      {
        (todo.labels.some((label) => label.isActive)) && (
          <>
            <div className={classes.containerLabels}>
              {
                todo.labels.map((label) => (
                  label.isActive && (
                    <div 
                      className={classes.label}
                      key={label.id} 
                      style={{
                        background: label.color,
                      }}
                    />
                  )
                ))
              }
            </div>
            <hr className={classes.hrLabels}/>
          </>
        )
      }
    </>
  )
}

export default TodoLabels;
