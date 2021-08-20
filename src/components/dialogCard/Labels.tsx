import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import DialogLabels from '../dialogLabels/DialogLabels';
import { useSelector } from 'react-redux';
// import { selectBufferTodo } from "../../slices/bufferTodoSlice";
import { Label } from "./Label";

const useStyles = makeStyles((theme) => ({
  labels: {
    marginTop: theme.spacing(2),
  },
  containerLabelsBlock: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  labelBlock: {
    lineHeight: '30px',
    minWidth: 30,
    height: 30,
    borderRadius: 4,
    padding: theme.spacing(1),
    transition: '0.3s',
    opacity: 0.6,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.contrastText,
    "&:hover": {
      cursor: 'pointer',
      opacity: 0.8,
    }
  },
  addIcon: {
    height: '48px',
    marginBottom: theme.spacing(1),
  },
}));

interface IProps {
  bufferLabels: Array<Label>,
  setBufferLabels: (value: Array<Label>) => void,
}

const Labels: React.FC<IProps> = ({
  bufferLabels,
  setBufferLabels,
}) => {
  const classes = useStyles();
  // const labels: Array<Label> | undefined = useSelector(selectBufferTodo)?.labels;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  }

  return (
    <>
      <Typography
        variant='body1'
        className={classes.labels}
      >
        Labels
      </Typography>

      <div className={classes.containerLabelsBlock}>
        {
          bufferLabels.map((label) => (
            label.isActive && (
              <div
                key={label.id}
                className={classes.labelBlock}
                style={{
                  background: label.color,
                }}
                onClick={handleOpen}
              >
                {label.text}
              </div>
            )
          ))
        }
        <IconButton
          onClick={handleOpen}
          className={classes.addIcon}
        >
          <AddIcon />
        </IconButton>
      </div>

      <DialogLabels
        isOpen={isOpen}
        bufferLabels={bufferLabels}
        setIsOpen={setIsOpen}
        setBufferLabels={setBufferLabels}
      />
    </>
  )
}

export default Labels;
