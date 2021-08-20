import React, { ChangeEvent } from "react";
import { makeStyles, createTheme } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';
import common from '@material-ui/core/colors/common';
import { ThemeProvider } from '@material-ui/core/styles';
import { Label } from '../dialogCard/Label';

const useStyles = makeStyles((theme) => ({
  labelBlock: {
    lineHeight: '30px',
    minHeight: 30,
    transition: '0.3s',
    minWidth: 200,
    width: '30vw',
    maxWidth: 500,
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
  setBufferLabels: any,
}

const LabelBlock: React.FC<IProps> = ({
  label,
  editLabel,
  textLabel,
  setTextLabel,
  setBufferLabels,
}) => {
  const classes = useStyles();

  const changeLabel = (isActive: boolean): void => {
    setBufferLabels((previousLabels: any) => {
      const newLabels: Array<Label> = JSON.parse(JSON.stringify(previousLabels));
      const newLabel: Label | undefined = newLabels.find((currentLabel) => currentLabel.id === label.id);

      if (newLabel) {
        newLabel.isActive = !isActive;
      }

      return newLabels;
    });
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
