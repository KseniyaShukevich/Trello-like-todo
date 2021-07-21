import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles, alpha } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { addList } from '../../slices/listsSlice';
import AddButton from '../../utils/AddButton';
import CircleButton from '../../utils/CircleButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    position: 'relative',
    boxSizing: 'border-box',
    width: '300px',
    border: `solid 1px ${alpha(theme.palette.secondary.main, 0.5)}`,
    background: alpha(theme.palette.secondary.main, 0.3),
    borderRadius: '4px',
  },
  button: {
    marginTop: theme.spacing(2),
    width: '100%',
    background: alpha(theme.palette.secondary.main, 0.4),
    color: 'black',
    "&:hover": {
    background: alpha(theme.palette.secondary.main, 0.8),
    }
  },
}));

const AddList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isNewList, setIsNewList] = useState<boolean>(false);
  const [listName, setListName] = useState<string>('');

  const addNewList = (): void => {
    if (listName) {
      dispatch(addList(listName));
      setListName('');
      setIsNewList(false);
    }
  }
  
  return (
    <>
      {
        isNewList ? (
          <div className={classes.container}>
            <CircleButton 
              onClick={() => setIsNewList(false)}
              Child={CloseIcon}
            />
            <TextField 
              id="standard-basic" 
              label="Name" 
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            <Button
              color='secondary' 
              variant='outlined'
              className={classes.button}
              onClick={addNewList}
            >
              Add list
            </Button>
          </div>
        ) : (
          <AddButton
            onClick={() => setIsNewList(true)}
            text={'Add another list'}
          />
        )
      }
    </>
  )
}

export default AddList;
