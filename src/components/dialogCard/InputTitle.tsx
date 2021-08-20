import React, { ChangeEvent } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'block',
    marginTop: theme.spacing(4),
    height: '70px',
  },
}));

interface IProps {
  bufferTitle: string,
  isErrorTitleEmpty: boolean,
  isErrorTitleTooLong: boolean,
  setBufferTitle: (value: string) => void,
  setIsErrorTitleEmpty: (value: boolean) => void,
  setIsErrorTitleTooLong: (value: boolean) => void,
}

const InputTitle: React.FC<IProps> = ({
  bufferTitle,
  isErrorTitleEmpty,
  isErrorTitleTooLong,
  setBufferTitle,
  setIsErrorTitleEmpty,
  setIsErrorTitleTooLong,
}) => {
  const classes = useStyles();

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setBufferTitle(target.value);
  }

  const handleFocus = (): void => {
    setIsErrorTitleEmpty(false);
    setIsErrorTitleTooLong(false);
  }

  const getHelperText = (): string => {
    if (isErrorTitleEmpty) {
      return "Empty title.";
    }

    if (isErrorTitleTooLong) {
      return 'Title is too long.';
    }

    return '';
  }

  return (
    <TextField
      required
      error={isErrorTitleEmpty || isErrorTitleTooLong}
      helperText={getHelperText()}
      value={bufferTitle}
      onChange={handleChange}
      className={classes.title}
      onFocus={handleFocus}
      id="standard-basic"
      label="Title"
    />
  )
}

export default InputTitle;
