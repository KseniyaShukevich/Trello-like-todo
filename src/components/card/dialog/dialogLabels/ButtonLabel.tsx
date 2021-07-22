import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import { Label } from '../../../../utils/labels';

const useStyles = makeStyles((theme) => ({
  containerButton: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginLeft: theme.spacing(1),
    height: '48px',
  },
}));

interface IProps {
  label: Label,
  editLabel: string,
  setEditLabel: (value: string) => void
}

const ButtonLabel: React.FC<IProps> = ({
  label,
  editLabel,
  setEditLabel,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.containerButton}>
      {
        (editLabel === label.id) ? (
          <IconButton 
            className={classes.button}
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
