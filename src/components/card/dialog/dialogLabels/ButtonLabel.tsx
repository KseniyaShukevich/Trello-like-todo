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
  textLabel: string,
  labels: Array<Label>,
  setLabels: (value: Array<Label>) => void,
  setEditLabel: (value: string) => void
}

const ButtonLabel: React.FC<IProps> = ({
  label,
  editLabel,
  textLabel,
  labels,
  setLabels,
  setEditLabel,
}) => {
  const classes = useStyles();

  const hundleSave = () => {
    const newLabels: Array<Label> = JSON.parse(JSON.stringify(labels));
    const oldLabel: Label | undefined = newLabels.find((el) => el.id === label.id);
    oldLabel && (oldLabel.text = textLabel);
    setLabels(newLabels);
    setEditLabel('');
  }

  return (
    <div className={classes.containerButton}>
      {
        (editLabel === label.id) ? (
          <IconButton 
            className={classes.button}
            onClick={hundleSave}
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
