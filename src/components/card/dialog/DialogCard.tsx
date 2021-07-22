import React from "react";
import CardColor from './CardColor';
import Labels from './Labels';
import InputTitle from './InputTitle';
import InputText from './InputText';
import Dates from './Dates';
import DialogLayout from '../../../utils/DialogLayout';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Todo from '../../../utils/Todo';

const useStyles = makeStyles((theme) => ({
  hr: {
    background: theme.palette.primary.main,
    width: '100%',
    height: '1px',
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
}));

interface IProps {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
  textButton: string,
  todo?: Todo,
}

const DialogCard: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
  textButton,
  todo,
}) => {
  const classes = useStyles();

  return (
    <DialogLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <CardColor />
      <div className={classes.hr} />
      <Labels 
        labels={todo && todo.labels}
      />
      <div className={classes.hr} />
      <InputTitle />
      <InputText />
      <Dates />
      <Button 
        variant='contained' 
        color='primary'
        className={classes.button}
      >
        {textButton}
      </Button>
    </DialogLayout>
  )
}

export default DialogCard;
