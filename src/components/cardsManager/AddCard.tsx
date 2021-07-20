import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, alpha } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  button: {
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

const AddCard: React.FC = () => {
  const classes = useStyles();
  const [isNewCard, setIsNewCard] = useState<boolean>(false);

  return (
    <Button 
    color='secondary' 
    variant='outlined'
    // variant='contained'
    className={classes.button}
    onClick={() => setIsNewCard(true)}
    >
      <AddIcon className={classes.addIcon} />
      Add Card
    </Button>
  )
}

export default AddCard;
