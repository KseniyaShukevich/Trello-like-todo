import React, { ChangeEvent, useState } from "react";
import DialogLayout from '../../utils/DialogLayout';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { useDispatch } from 'react-redux';
import { addList } from '../../slices/listsSlice';
import { DialogActions, DialogContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
    height: 70,
    display: 'block',
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

interface IProps {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
}

const DialogList: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [listName, setListname] = useState<string>('');
  const [isErrorNameEmpty, setIsErrorNameEmpty] = useState<boolean>(false);
  const [isErrorTooLong, setIsErrorTooLong] = useState<boolean>(false);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setListname(target.value);
  }

  const handleClick = (): void => {
    if (listName) {
      if (listName.length <= 50) {
        dispatch(addList(listName));
        handleClose();
      } else {
        setIsErrorTooLong(true);
      }
    } else {
      setIsErrorNameEmpty(true);
    }
  }

  const handleFocus = (): void => {
    setIsErrorNameEmpty(false);
    setIsErrorTooLong(false);
  }

  const handleClose = (): void => {
    setListname('');
    setIsErrorNameEmpty(false);
    setIsErrorTooLong(false);
    setIsOpen(false);
  }

  return (
    <DialogLayout
      isOpen={isOpen}
      onClose={handleClose}
      title={'Create new list'}
    >
      <DialogContent>
        <TextField 
          required
          error={isErrorNameEmpty || isErrorTooLong}
          helperText={isErrorNameEmpty ? "Empty list's name." : isErrorTooLong ? 'Name is too long.' : ''}
          value={listName}
          className={classes.input}
          onChange={handleChange}
          onFocus={handleFocus}
          id="standard-basic" 
          label="Title" 
        />
      </DialogContent>
      <DialogActions>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={handleClick}
          >
            Create
          </Button>
      </DialogActions>
    </DialogLayout>
  )
}

export default DialogList;
