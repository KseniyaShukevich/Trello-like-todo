import React, { ChangeEvent } from "react";
import { makeStyles, createTheme } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';
import common from '@material-ui/core/colors/common';
import { ThemeProvider } from '@material-ui/core/styles';
import { Label } from '../../utils/labels';
import { useDispatch } from 'react-redux';
import { editTodoLabelIsActive } from "../../slices/bufferTodoSlice";

const useStyles = makeStyles((theme) => ({
  labelBlock: {
    lineHeight: '30px',
    minHeight: '30px',
    transition: '0.5s',
    minWidth: '200px',
    width: '30vw',
    maxWidth: '500px',
    opacity: 0.7,
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    color: theme.palette.primary.contrastText,
    "&:hover": {
      cursor: 'pointer',
      opacity: 0.9,
    }
  },
  addedIcon: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1.3),
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
  label: Label,
  editLabel: string,
  textLabel: string,
  setTextLabel: (value: string) => void,
}

const LabelBlock: React.FC<IProps> = ({
  label,
  editLabel,
  textLabel,
  setTextLabel,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const changeLabel = (isActive: boolean): void => {
    dispatch(editTodoLabelIsActive({
      label: label,
      isActive: !isActive,
    }));
  }

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setTextLabel(target.value)
  }

  return (
    <div 
      className={classes.labelBlock}
      style={{
        background: label.color,
      }}
      onClick={() => changeLabel(label.isActive)}
    >
  
      {
        (editLabel === label.id) ? (
          <ThemeProvider theme={textFieldTheme}>
            <TextField 
              id="standard-basic" 
              label="Label" 
              value={textLabel}
              InputLabelProps={{
                className: classes.input,
              }}
              InputProps={{
                className: classes.input,
              }}
              onChange={(e) => handleChange(e)}
            />
          </ThemeProvider>
        ) : (
          <>
            {label.text}

            {
              label.isActive && (
                <DoneIcon 
                  className={classes.addedIcon}
                />
              )
            }
          </>
        )
      }

    </div>
  )
}

export default LabelBlock;
