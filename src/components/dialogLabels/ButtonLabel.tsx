import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import { Label } from '../dialogCard/Label';
import { useDispatch } from 'react-redux';
import { editTodoLabelText } from "../../slices/bufferTodoSlice";

const useStyles = makeStyles((theme) => ({
  containerButton: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginLeft: theme.spacing(1),
    height: 48,
  },
}));

interface IProps {
  label: Label,
  editLabel: string,
  textLabel: string,
  setTextLabel: (value: string) => void,
  setEditLabel: (value: string) => void
}

const ButtonLabel: React.FC<IProps> = ({
  label,
  editLabel,
  textLabel,
  setTextLabel,
  setEditLabel,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSave = (): void => {
    dispatch(editTodoLabelText({
      label: label,
      text: textLabel,
    }));
    setEditLabel('');
    setTextLabel('');
  }

  return (
    <div className={classes.containerButton}>
      {
        (editLabel === label.id) ? (
          <IconButton 
            className={classes.button}
            onClick={handleSave}
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
