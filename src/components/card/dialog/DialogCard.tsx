import React, { useState, useEffect } from "react";
import CardColor from './CardColor';
import Labels from './Labels';
import InputTitle from './InputTitle';
import InputText from './InputText';
import Date from './Date';
import DialogLayout from '../../../utils/DialogLayout';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Todo from '../../../utils/Todo';
import labels, { Label } from '../../../utils/labels';
import { useSelector, useDispatch } from 'react-redux';
import { selectBufferTodo } from "../../../slices/bufferTodoSlice";

const useStyles = makeStyles((theme) => ({
  startDate: {
    marginRight: theme.spacing(1),
  },
  dates: {
    marginTop: theme.spacing(2),
  },
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
  listId: string,
}

const DialogCard: React.FC<IProps> = ({
  isOpen,
  setIsOpen,
  textButton,
  listId,
}) => {
  const classes = useStyles();
  const bufferTodo = useSelector(selectBufferTodo);


  const [newTodo, setNewTodo] = useState<Todo>(bufferTodo ? bufferTodo : new Todo(listId, ''));
  const [currentLabels, setCurrentLabels] = useState<Array<Label>>(bufferTodo ? bufferTodo.labels : labels);

  return (
    <DialogLayout
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={'Card'}
    >
      <CardColor />
      <div className={classes.hr} />
      <Labels />
      <div className={classes.hr} />
      <InputTitle 
        todo={newTodo}
      />
      <InputText 
        todo={newTodo}
      />
      <div className={classes.dates}>
        <Date 
          propDate={newTodo.startDate}
          text={'Start date'}
          className={classes.startDate}
        />
        <Date 
          propDate={newTodo.endDate}
          text={'End date'}
        />
      </div>
      <Button 
        variant='contained' 
        color='primary'
        className={classes.button}
        // onClick={hundleChangeCard}
      >
        {textButton}
      </Button>
    </DialogLayout>
  )
}

export default DialogCard;
