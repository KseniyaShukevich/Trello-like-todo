import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import DialogCardColor from '../dialogCardColor/DialogCardColor';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from 'react-redux';
import { selectBufferTodo } from "../../slices/bufferTodoSlice";

const useStyles = makeStyles((theme) => ({
  containerCardColor: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    minWidth: 300,
    width: '70vw',
    maxWidth: 510,
  },
  cardColorTitle: {
    marginRight: theme.spacing(1),
  },
  colorBlock: {
    width: 30, 
    height: 30, 
    opacity: 0.6,
    transition: '0.3s',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    "&:hover": {
      cursor: 'pointer',
      opacity: 0.8,
    }
  },
}));

const CardColor: React.FC = () => {
  const color = useSelector(selectBufferTodo)?.color;
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenDialog = (): void => {
    setIsOpen(true);
  }

  return (
    <div className={classes.containerCardColor}>
      <Typography 
        className={classes.cardColorTitle}
        variant='body1'
      >
        Card color:
      </Typography>

      {
        color ? (
          <div 
            className={classes.colorBlock}
            onClick={handleOpenDialog}
            style={{
              background: color,
            }}
          />
        ) : (
          <IconButton
            onClick={handleOpenDialog}
          >
            <AddIcon />
          </IconButton>
        )
      }

      <DialogCardColor
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  )
}

export default CardColor;
