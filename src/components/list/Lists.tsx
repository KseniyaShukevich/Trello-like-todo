import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectLists } from '../../slices/listsSlice';
import ListName from './ListName';
import AddCard from '../card/AddCard';
import Card from '../card/Card';
import { Scrollbars } from 'react-custom-scrollbars-2';
import PlaceCard from '../card/PlaceCard';
import List from './List';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '8px',
      backgroundColor: alpha(theme.palette.secondary.main, 0.3),
      borderRadius: theme.shape.borderRadius,
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
      boxShadow: 'inset 1px 1px 10px #f3faf7',
    },
  },
}))

const Lists: React.FC = () => {
  const classes = useStyles();
  const lists = useSelector(selectLists);
  const [focusedTodo, setFocusedTodo] = useState<string>('');
  const [focusedList, setFocusedList] = useState<string>('');
  const [nextContainer, setNextContainer] = useState<string>('');
  const [top, setTop] = useState<number>(0);
  const [elementHeight1, setElementHeight1] = useState<string>('');
  const [elementHeight2, setElementHeight2] = useState<string>('');

  return (
    <>
      {
        lists.map((list) => (
          <List 
            key={list.id}
            list={list}
            focusedList={focusedList}
            setFocusedList={setFocusedList}
            focusedTodo={focusedTodo}
            setFocusedTodo={setFocusedTodo}
            setTop={setTop}
            nextContainer={nextContainer}
            setNextContainer={setNextContainer}
            top={top}
            elementHeight1={elementHeight1}
            setElementHeight1={setElementHeight1}
            elementHeight2={elementHeight2}
            setElementHeight2={setElementHeight2}
          />
          )
        )
      }
    </>
  )
}

export default Lists;
