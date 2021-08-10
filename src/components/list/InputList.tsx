import React, { ChangeEvent, useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, alpha } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { addList } from '../../slices/listsSlice';
import CircleButton from '../../utils/CircleButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    position: 'relative',
    boxSizing: 'border-box',
    width: 250,
    border: `solid 1px ${alpha(theme.palette.secondary.main, 0.8)}`,
    background: alpha(theme.palette.secondary.main, 0.7),
    borderRadius: 4,
  },
  input: {
    height: 60,
  },
  button: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
}));

interface IProps {
  setIsNewList: (value: boolean) => void,
}

const InputList: React.FC<IProps> = ({
  setIsNewList,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [listName, setListName] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const addNewList = (): void => {
    if (listName) {
      if (listName.length <= 50) {
        dispatch(addList(listName));
        setListName('');
        setIsNewList(false);
        setIsError(false);
      } else {
        setIsError(true);
      }
    }
  }

  const handleFocus = (): void => {
    setIsError(false);
  }

  const handleClose = (): void => {
    setIsNewList(false);
  }

  const handleChangeListName = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setListName(target.value);
  }

  return (
    <div className={classes.container}>
      <CircleButton 
        onClick={handleClose}
        Child={CloseIcon}
      />
      <TextField 
        id="standard-basic" 
        error={isError}
        helperText={isError ? 'Name is too long.' : ''}
        className={classes.input}
        label="Name" 
        value={listName}
        onFocus={handleFocus}
        onChange={(e) => handleChangeListName(e)}
      />
      <Button
        color='primary' 
        variant='contained'
        className={classes.button}
        onClick={addNewList}
      >
        Add list
      </Button>
    </div>
  )
}

export default InputList;
