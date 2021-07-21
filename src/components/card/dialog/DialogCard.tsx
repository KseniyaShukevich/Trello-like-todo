import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle  from "@material-ui/core/DialogTitle";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import CardColor from './CardColor';
import Labels from './Labels';
import InputTitle from './InputTitle';
import InputText from './InputText';
import Dates from './Dates';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  closeButton: {
    position: 'absolute',
    right: 0,
  },
  DialogTitle: {
    textAlign: 'center',
  },
}));

interface IProps {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
}

const DialogCard: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const classes = useStyles();

  return (
    <Dialog 
      onClose={() => setIsOpen(false)} 
      aria-labelledby="simple-dialog-title" 
      open={isOpen}
    >
      <IconButton 
        className={classes.closeButton}
        onClick={() => setIsOpen(false)}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle 
        id="simple-dialog-title"
        className={classes.DialogTitle}
      >
        Card
      </DialogTitle>

      <div className={classes.container}>
        <CardColor />
        <Labels />
        <InputTitle />
        <InputText />
        <Dates />
      </div>

    </Dialog>
  )
}

export default DialogCard;
