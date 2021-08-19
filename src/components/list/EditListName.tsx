import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { editList, deleteList } from '../../slices/listsSlice';
import { useDispatch } from 'react-redux';
import Button from "@material-ui/core/Button";
import CircleButton from '../../utils/CircleButton';
import IList from './IList';

const useStyles = makeStyles((theme) => ({
  editName: {
    padding: theme.spacing(1),
    background: alpha(theme.palette.secondary.main, 0.9),
    marginBottom: theme.spacing(1),
    width: `calc(250px - ${theme.spacing(2)}px)`,
    position: 'relative',
  },
  containerButtons: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    height: 60,
  },
  editButtons: {
    width: '49%',
  },
}))

interface IProps {
  list: IList,
  setIsEdit: (value: boolean) => void,
}

const EditListName: React.FC<IProps> = ({
  list,
  setIsEdit,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState<string>(list.name);
  const [isError, setIsError] = useState<boolean>(false);

  const handleClose = () => {
    setIsEdit(false);
  }

  const save = (): void => {
    if (name) {
      if (name.length <= 50) {
        dispatch(editList({
          id: list.id,
          newName: name,
        }));

        setIsEdit(false);
      } else {
        setIsError(true);
      }
    }
  }

  const handleDelete = (): void => {
    dispatch(deleteList(list.id));
    handleClose();
  }

  const handleFocus = (): void => {
    setIsError(false);
  }

  const getHelperText = (): string => {
    return isError ? 'Name is too long.' : '';
  }

  return (
    <Paper
      className={classes.editName}
    >
      <TextField
        id="standard-basic"
        className={classes.input}
        error={isError}
        helperText={getHelperText()}
        label="Name"
        value={name}
        onFocus={handleFocus}
        onChange={(e) => setName(e.target.value)}
      />
      <CircleButton
        onClick={handleClose}
        Child={CloseIcon}
      />
      <div className={classes.containerButtons}>
        <Button
          className={classes.editButtons}
          variant='contained'
          color='primary'
          onClick={save}
        >
          Save
        </Button>
        <Button
          className={classes.editButtons}
          variant='contained'
          color='primary'
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </Paper>
  )
}

export default EditListName;
