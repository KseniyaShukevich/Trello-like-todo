import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import DialogCardColor from './dialogCardColor/DialogCardColor';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  containerCardColor: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    minWidth: '300px',
    width: '33vw',
    maxWidth: '550px',
  },
  cardColorTitle: {
    marginRight: theme.spacing(1),
  },
  colorBlock: {
    width: '30px', 
    height: '30px', 
    opacity: 0.6,
    transition: '0.5s',
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
  currentColor: string,
  setCurrentColor: (value: string) => void,
}

const CardColor: React.FC<IProps> = ({
  currentColor,
  setCurrentColor,
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={classes.containerCardColor}>
      <Typography 
        className={classes.cardColorTitle}
        variant='body1'
      >
        Card color:
      </Typography>

      {
        currentColor ? (
          <div 
            className={classes.colorBlock}
            onClick={() => setIsOpen(true)}
            style={{
              background: currentColor,
            }}
          />
        ) : (
          <IconButton
            onClick={() => setIsOpen(true)}
          >
            <AddIcon />
          </IconButton>
        )
      }

      <DialogCardColor
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
      />
    </div>
  )
}

export default CardColor;
