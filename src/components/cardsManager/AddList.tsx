import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, alpha } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
  label: {
    color: theme.palette.secondary.main,
  },
  createList: {
    boxSizing: 'border-box',
    width: '300px',
    border: `solid 1px ${alpha(theme.palette.secondary.main, 0.5)}`,
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
  const [isNewList, setIsNewList] = useState<boolean>(false);
  
  return (
    <>
      {
        isNewList ? (
          <div className={classes.createList}>
            <div className={classes.container}>
            <TextField 
              id="standard-basic" 
              label="Name" 
              color='secondary' 
              InputLabelProps={{
                classes: {
                  root: classes.label,
                },
              }}
            />
              <div className={classes.containerButtons}>
                <Button
                  color='secondary' 
                  variant='outlined'
                  className={classes.button}
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
