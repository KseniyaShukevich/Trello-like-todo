import React, { ChangeEvent, useState } from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(4),
    width: '98.8%',
    [theme.breakpoints.down(1560)]: {
      width: "98.6%",
    },
    [theme.breakpoints.down(1440)]: {
      width: "98.4%",
    },
  },
}));

interface IProps {
  bufferText: string,
  setBufferText: (value: string) => void,
}

const InputText: React.FC<IProps> = ({
  bufferText,
  setBufferText,
}) => {
  const classes = useStyles();
  const [text, setText] = useState<string>(bufferText);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setText(target.value);
    setBufferText(target.value);
  }

  return (
    <TextareaAutosize
      value={text}
      onChange={handleChange}
      className={classes.text}
      minRows={3}
      placeholder='Description'
    />
  )
}

export default InputText;
