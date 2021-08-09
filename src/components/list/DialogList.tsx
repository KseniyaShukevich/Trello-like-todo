import React, { ChangeEvent, useState } from "react";
import DialogLayout from '../../utils/DialogLayout';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import { useDispatch } from 'react-redux';
import { addList } from '../../slices/listsSlice';

const useStyles = makeStyles((theme) => ({
  input: {
    height: 70,
    display: 'block',
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(3),
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
  const [isError, setIsError] = useState<boolean>(false);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setListname(target.value);
  }

  const handleClick = (): void => {
    if (listName) {
      dispatch(addList(listName));
      handleClose();
    } else {
      setIsError(true);
    }
  }

  const handleFocus = (): void => {
    setIsError(false);
  }

  const handleClose = (): void => {
    setListname('');
    setIsError(false);
    setIsOpen(false);
  }

  return (
    <DialogLayout
      isOpen={isOpen}
      onClose={handleClose}
      title={'Create new list'}
    >
      <TextField 
        required
        error={isError}
        helperText={isError ? "Empty title." : ''}
        value={listName}
        className={classes.input}
        onChange={handleChange}
        onFocus={handleFocus}
        id="standard-basic" 
        label="Title" 
      />
      <div>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={handleClick}
        >
          Create
        </Button>
      </div>
    </DialogLayout>
  )
}

export default DialogList;
