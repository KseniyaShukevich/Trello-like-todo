import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, alpha } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { addList } from '../../slices/listsSlice';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1),
  },
  button: {
    width: '49%',
    background: alpha(theme.palette.secondary.main, 0.4),
    color: 'black',
    "&:hover": {
    background: alpha(theme.palette.secondary.main, 0.8),
    }
  },
  containerButtons: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
  },
  createList: {
    boxSizing: 'border-box',
    width: '300px',
    border: `solid 1px ${alpha(theme.palette.secondary.main, 0.5)}`,
    background: alpha(theme.palette.secondary.main, 0.3),
    borderRadius: '4px',
  },
  listButton: {
    width: '300px',
    background: alpha(theme.palette.secondary.main, 0.4),
    color: 'black',
    "&:hover": {
    background: alpha(theme.palette.secondary.main, 0.8),
    }
  },
  addIcon: {
    marginRight: theme.spacing(1),
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
          <div className={classes.createList}>
            <div className={classes.container}>
            <TextField 
              id="standard-basic" 
              label="Name" 
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
              <div className={classes.containerButtons}>
                <Button
                  color='secondary' 
                  variant='outlined'
                  className={classes.button}
                  onClick={addNewList}
                >
                  Add list
                </Button>
                <Button
                  color='secondary' 
                  variant='outlined'
                  className={classes.button}
                  onClick={() => setIsNewList(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button 
          color='secondary' 
          variant='outlined'
          className={classes.listButton}
          onClick={() => setIsNewList(true)}
          >
            <AddIcon className={classes.addIcon} />
            Add another list
          </Button>
      )
    }
    </>
  )
}

export default AddList;
