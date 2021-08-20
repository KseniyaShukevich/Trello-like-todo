import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import { Label } from '../dialogCard/Label';

const useStyles = makeStyles((theme) => ({
  containerButton: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginLeft: theme.spacing(1),
    height: 48,
  },
}));

interface IProps {
  label: Label,
  editLabel: string,
  textLabel: string,
  setTextLabel: (value: string) => void,
  setEditLabel: (value: string) => void,
  setBufferLabels: any,
}

const ButtonLabel: React.FC<IProps> = ({
  label,
  editLabel,
  textLabel,
  setTextLabel,
  setEditLabel,
  setBufferLabels,
}) => {
  const classes = useStyles();

  const handleSave = (): void => {
    setBufferLabels((previousLabels: any) => {
      const newLabels: Array<Label> = JSON.parse(JSON.stringify(previousLabels));
      const newLabel: Label | undefined = newLabels.find((currentLabel) => currentLabel.id === label.id);

      if (newLabel) {
        newLabel.text = textLabel;
      }

      return newLabels;
    });
    setEditLabel('');
    setTextLabel('');
  }

  return (
    <div className={classes.containerButton}>
      {
        (editLabel === label.id) ? (
          <IconButton
            className={classes.button}
            onClick={handleSave}
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
