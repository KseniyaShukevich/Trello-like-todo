import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle  from "@material-ui/core/DialogTitle";
import { makeStyles, createTheme } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';
import common from '@material-ui/core/colors/common';
import { ThemeProvider } from '@material-ui/core/styles';

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


  labelBlock: {
    lineHeight: '30px',
    minHeight: '30px',
    transition: '0.5s',
    minWidth: '200px',
    width: '30vw',
    maxWidth: '500px',
    opacity: 0.6,
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: '4px',
    position: 'relative',
    color: theme.palette.primary.contrastText,
    "&:hover": {
      cursor: 'pointer',
      opacity: 0.8,
    }
  },
  containerLabel: {
    display: 'flex',
  },
  addedIcon: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1.3),
  },
  containerButton: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginLeft: theme.spacing(1),
    height: '48px',
  },
  input: {
    color: theme.palette.common.white,
  },
}));

const textFieldTheme = createTheme({
  palette: {
    primary: {
      main: common.white,
    },
    secondary: {
      main: common.white,
    },   
  }
})

interface IProps {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
}

const DialogLabels: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const classes = useStyles();
  const [editLabel, setEditLabel] = useState<string>('');

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
      Labels
    </DialogTitle>

    <div className={classes.container}>
      {
        [{id: 'sf', text: 'sdf sdf gdf', color: 'red'}, {id: 'dgv', text: '', color: 'blue'}, {id: 'dhs<a', text: 'ds fds', color: 'green'}]
        .map((label) => (
          <div key={label.id} className={classes.containerLabel}>
            <div 
              className={classes.labelBlock}
              style={{
                background: label.color,
              }}
            >

              {
                (editLabel === label.id) ? (
                  <ThemeProvider theme={textFieldTheme}>
                    <TextField 
                    id="standard-basic" 
                    label="Label" 
                    InputLabelProps={{
                      className: classes.input,
                    }}
                    InputProps={{
                      className: classes.input,
                    }}
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    />
                  </ThemeProvider>
                ) : (
                  <>
                    {label.text}
                    <DoneIcon 
                      className={classes.addedIcon}
                    />
                  </>
                )
              }

            </div>
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
          </div>
        ))
      }
    </div>

  </Dialog>
  )
}

export default DialogLabels;
