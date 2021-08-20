import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import DialogCardColor from '../dialogCardColor/DialogCardColor';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  containerCardColor: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    minWidth: 300,
    width: '70vw',
    maxWidth: 510,
  },
  cardColorTitle: {
    marginRight: theme.spacing(1),
  },
  colorBlock: {
    width: 30,
    height: 30,
    opacity: 0.6,
    transition: '0.3s',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    "&:hover": {
      cursor: 'pointer',
      opacity: 0.8,
    }
  },
}));

interface IProps {
  bufferColor: string,
  setBufferColor: (value: string) => void,
}

const CardColor: React.FC<IProps> = ({
  bufferColor,
  setBufferColor,
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenDialog = (): void => {
    setIsOpen(true);
  }

  return (
    <div className={classes.containerCardColor}>
      <Typography
        className={classes.cardColorTitle}
        variant='body1'
      >
        Card color:
      </Typography>

      {
        bufferColor ? (
          <div
            className={classes.colorBlock}
            onClick={handleOpenDialog}
            style={{
              background: bufferColor,
            }}
          />
        ) : (
          <IconButton
            onClick={handleOpenDialog}
          >
            <AddIcon />
          </IconButton>
        )
      }

      <DialogCardColor
        isOpen={isOpen}
        bufferColor={bufferColor}
        setIsOpen={setIsOpen}
        setBufferColor={setBufferColor}
      />
    </div>
  )
}

export default CardColor;
