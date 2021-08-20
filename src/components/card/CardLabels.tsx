import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Label } from "../dialogCard/Label";

const useStyles = makeStyles((theme) => ({
  containerLabels: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  label: {
    width: 50,
    high: 10,
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    opacity: 0.7,
  },
  hrLabels: {
    marginTop: 0,
  },
  highHrLabels: {
    marginTop: theme.spacing(1.5),
  }
}))

interface IProps {
  isHigh: boolean,
  labels: Array<Label>
}

const TodoLabels: React.FC<IProps> = ({
  isHigh,
  labels,
}) => {
  const classes = useStyles();

  const getClassName = (): string => {
    return isHigh ? classes.highHrLabels : classes.hrLabels;
  }

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
            <hr className={getClassName()}/>
          </>
        )
      }
    </>
  )
}

export default TodoLabels;
