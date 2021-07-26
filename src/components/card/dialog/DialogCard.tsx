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
import { addTodo } from "../../../slices/listsSlice";

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
  const dispatch = useDispatch();
  const bufferTodo = useSelector(selectBufferTodo);
  
  const hundleChangeTodo = (): void => {
    dispatch(addTodo({
      idList: listId,
      todo: bufferTodo,
    }));
  }

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
      <InputTitle />
      <InputText />
      <div className={classes.dates}>
        <Date 
          isStartDate={true}
          text={'Start date'}
          className={classes.startDate}
        />
        <Date 
          isStartDate={false}
          text={'End date'}
        />
      </div>
      <Button 
        variant='contained' 
        color='primary'
        className={classes.button}
        onClick={hundleChangeTodo}
      >
        {textButton}
      </Button>
    </DialogLayout>
  )
}

export default DialogCard;
