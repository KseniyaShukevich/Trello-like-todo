import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, alpha } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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

interface IProps {
  onClick: () => void,
  text: string,
}

const AddButton: React.FC<IProps> = ({
  onClick,
  text,
}) => {
  const classes = useStyles();

  return (
    <Button 
      color='secondary' 
      variant='outlined'
      className={classes.listButton}
      onClick={onClick}
    >
      <AddIcon className={classes.addIcon} />
        {text}
    </Button>
  )
}

export default AddButton;
