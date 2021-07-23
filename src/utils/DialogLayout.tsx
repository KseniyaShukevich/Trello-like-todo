import React, { ReactElement } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle  from "@material-ui/core/DialogTitle";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  // dialog: {
  //   background: alpha(theme.palette.common.white, 0.4),
  // },
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
  setIsOpen: (value: boolean) => void,
  title: string,
  children: ReactElement | Array<ReactElement>,
}

const DialogLayout: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
  title,
  children,
}) => {
  const classes = useStyles();

  return (
    <Dialog 
      // PaperProps={{
      //   className: classes.dialog
      // }}
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
      {title}
    </DialogTitle>

    <div className={classes.container}>
      {children}
    </div>
  </Dialog>
  );
}

export default DialogLayout;
