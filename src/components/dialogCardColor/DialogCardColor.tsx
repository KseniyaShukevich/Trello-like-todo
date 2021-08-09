import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import DialogLayout from '../../utils/DialogLayout';
import colors from '../../utils/colors';
import DoneIcon from '@material-ui/icons/Done';
import { useSelector, useDispatch } from 'react-redux';
import { selectBufferTodo, editTodoColor } from "../../slices/bufferTodoSlice";

const useStyles = makeStyles((theme) => ({
  colorBlock: {
    lineHeight: '30px',
    minHeight: '30px',
    transition: '0.5s',
    minWidth: '200px',
    width: '30vw',
    maxWidth: '500px',
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
  const bufferTodo = useSelector(selectBufferTodo);

  const handleChangeColor = (color: string): void => {
    dispatch(editTodoColor(color))
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
      <>
        {
          colors.map((color) => (
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
                bufferTodo && bufferTodo.color === color && (
                  <DoneIcon 
                    className={classes.addedIcon}
                  />
                )
              }
            </div>
          ))
        }
      </>
    </DialogLayout>
  )
}

export default DialogLabels;
