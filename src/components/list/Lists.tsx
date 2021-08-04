import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectLists } from '../../slices/listsSlice';
import ListName from './ListName';
import AddCard from '../card/AddCard';
import Card from '../card/Card';

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
  list: {
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  scroll: {
    overflowY: 'auto',
    maxHeight: '80vh',
    marginBottom: theme.spacing(1),
    paddingRight: theme.spacing(0.5),
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
          <div key={list.id}>
            <div
            className={classes.list}
          >
            <ListName
              list={list}
            />
            <div 
              className={classes.scroll}
            >

              {list.todos.map((todo, index, todos) => (
                <Card 
                  key={todo.id}
                  todo={todo}
                  focusedList={focusedList}
                  focusedTodo={focusedTodo}
                  keyup={keyup}
                  setFocusedList={setFocusedList}
                  setFocusedTodo={setFocusedTodo}
                  setKeyup={setKeyup}
                />
              ))}

             </div>
            <AddCard 
              idList={list.id}
            />
          </div>
          </div>
          )
        )
      }
    </>
  )
}

export default Lists;
