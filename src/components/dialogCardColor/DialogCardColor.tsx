import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import DialogLayout from '../../utils/DialogLayout';
import CONSTANTS from "../../utils/CONSTANTS";
import DoneIcon from '@material-ui/icons/Done';
import { useSelector, useDispatch } from 'react-redux';
import { selectBufferTodo, editTodoColor } from "../../slices/bufferTodoSlice";
import DialogContent from "@material-ui/core/DialogContent";
import Todo from "../card/Todo";

const useStyles = makeStyles((theme) => ({
  colorBlock: {
    lineHeight: '30px',
    minHeight: 30,
    transition: '0.3s',
    minWidth: 200,
    width: '30vw',
    maxWidth: 500,
    opacity: 0.7,
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    color: theme.palette.primary.contrastText,
    "&:hover": {
      cursor: 'pointer',
      opacity: 0.9,
    }
  },
  addedIcon: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1.3),
  },
}));

interface IProps {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
}

const DialogLabels: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const bufferColor: string | undefined = useSelector(selectBufferTodo)?.color;

  const handleChangeColor = (color: string): void => {
    if (bufferColor === color) {
      dispatch(editTodoColor(''));
    } else {
      dispatch(editTodoColor(color));
    }
  }

  const onClose = () => {
    setIsOpen(false);
  }

  return (
    <DialogLayout
      isOpen={isOpen}
      onClose={onClose}
      title={'Card color'}
    >
      <DialogContent>
        {
          CONSTANTS.COLORS.map((color) => (
            <div
              className={classes.colorBlock}
              key={color}
              style={{
                background: color,
              }}
              onClick={() => handleChangeColor(color)}
            >
              {color}
              {
                bufferColor === color && (
                  <DoneIcon
                    className={classes.addedIcon}
                  />
                )
              }
            </div>
          ))
        }
      </DialogContent>
    </DialogLayout>
  )
}

export default DialogLabels;
