import React, { ReactElement } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle  from "@material-ui/core/DialogTitle";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  container: {
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
  onClose: () => void,
  title: string,
  children: ReactElement | Array<ReactElement>,
}

const DialogLayout: React.FC<IProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const classes = useStyles();

  return (
    <Dialog 
      onClose={onClose} 
      aria-labelledby="simple-dialog-title" 
      open={isOpen}
    >
    <IconButton 
      className={classes.closeButton}
      onClick={onClose}
    >
      <CloseIcon />
    </IconButton>

    <DialogTitle 
      id="simple-dialog-title"
      className={classes.DialogTitle}
    >
      {title}
    </DialogTitle>

    <div className={classes.container}>
      {children}
    </div>
  </Dialog>
  );
}

export default DialogLayout;
