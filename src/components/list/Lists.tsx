import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectLists } from '../../slices/listsSlice';
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
  const [focusedList, setFocusedList] = useState('');
  const [focusedTodo, setFocusedTodo] = useState('');
  const [keyup, setKeyup] = useState('');

  const onKeyup = (e: KeyboardEvent): void => {
    setKeyup(e.code);
  }

  useEffect(() => {
    window.addEventListener('keyup', (e) => onKeyup(e));
  }, []);

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
            keyup={keyup}
            setKeyup={setKeyup}
          />
          )
        )
      }
    </>
  )
}

export default Lists;
