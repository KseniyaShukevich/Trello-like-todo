import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectLists } from '../../slices/listsSlice';
import ListName from './ListName';
import AddCard from '../card/AddCard';
import Card from '../card/Card';
import { Scrollbars } from 'react-custom-scrollbars-2';
import PlaceCard from '../card/PlaceCard';
import ListClass from '../../utils/List';
import Todo from '../../utils/Todo';

const useStyles = makeStyles((theme) => ({
  list: {
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  scroll: {
    overflowY: 'auto',
    maxHeight: '80vh',
    marginBottom: theme.spacing(1),
  },
}))

interface IProps {
  list: ListClass,
  focusedList: string,
  focusedTodo: string,
  keyup: string,
  setFocusedList: (value: string) => void,
  setFocusedTodo: (value: string) => void,
  setKeyup: (value: string) => void,
}

const List: React.FC<IProps> = ({
  list,
  focusedList,
  focusedTodo,
  keyup,
  setFocusedList,
  setFocusedTodo,
  setKeyup,
}) => {
  const classes = useStyles();
  const refContainer = useRef(null);

  return (
    <>
      {
          <div
            className={classes.list}
          >
            <ListName
              list={list}
            />
            <div 
              ref={refContainer}
              className={classes.scroll}
            >

              {list.todos.map((todo, index, todos) => (
                <Card 
                  isEnd={index === todos.length - 1 ? true : false}
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
      }
    </>
  )
}

export default List;
