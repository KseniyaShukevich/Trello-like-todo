import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import DialogLabels from './dialogLabels/DialogLabels';
import { Label } from '../../../utils/labels';
import { useSelector, useDispatch } from 'react-redux';
import { selectBufferTodo } from "../../../slices/bufferTodoSlice";

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
    minWidth: '30px',
    height: '30px',
    borderRadius: '4px',
    padding: theme.spacing(1),
    transition: '0.5s',
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

const Labels: React.FC = () => {
  const classes = useStyles();
  const labels = useSelector(selectBufferTodo)?.labels;
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          labels && labels.map((label) => (
            label.isActive && (
              <div
                key={label.id}
                className={classes.labelBlock}
                style={{
                  background: label.color,
                }}
                onClick={() => setIsOpen(true)}
              >
                {label.text}
              </div>
            )
          ))
        }
        <IconButton
          onClick={() => setIsOpen(true)}
          className={classes.addIcon}
        >
          <AddIcon />
        </IconButton>
      </div>

      <DialogLabels 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // labels={labels}
        // setLabels={setLabels}
      />
    </>
  )
}

export default Labels;
