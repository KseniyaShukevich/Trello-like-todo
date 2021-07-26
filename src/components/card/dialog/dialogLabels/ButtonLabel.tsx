import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import { Label } from '../../../../utils/labels';
import { useSelector, useDispatch } from 'react-redux';
import { selectBufferTodo, editTodoLabelText } from "../../../../slices/bufferTodoSlice";

const useStyles = makeStyles((theme) => ({
  containerButton: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginLeft: theme.spacing(1),
    height: '48px',
  },
}));

interface IProps {
  label: Label,
  editLabel: string,
  textLabel: string,
  setEditLabel: (value: string) => void
}

const ButtonLabel: React.FC<IProps> = ({
  label,
  editLabel,
  textLabel,
  setEditLabel,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const hundleSave = () => {
    dispatch(editTodoLabelText({
      label: label,
      text: textLabel,
    }));
    setEditLabel('');
  }

  return (
    <div className={classes.containerButton}>
      {
        (editLabel === label.id) ? (
          <IconButton 
            className={classes.button}
            onClick={hundleSave}
          >
            <DoneIcon 
            />
          </IconButton>
        ) : (
          <IconButton 
            className={classes.button}
            onClick={() => setEditLabel(label.id)}
          >
            <EditIcon />
          </IconButton>
        )
      }
    </div>
  )
}

export default ButtonLabel;
