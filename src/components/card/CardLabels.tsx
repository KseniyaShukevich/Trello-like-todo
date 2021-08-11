import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Label } from "../dialogCard/labels";

const useStyles = makeStyles((theme) => ({
  containerLabels: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  label: {
    width: 50,
    height: 10,
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
  labels: Array<Label>
}

const TodoLabels: React.FC<IProps> = ({
  labels,
}) => {
  const classes = useStyles();

  return (
    <>
      {
        (labels.some((label) => label.isActive)) && (
          <>
            <div className={classes.containerLabels}>
              {
                labels.map((label) => (
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
