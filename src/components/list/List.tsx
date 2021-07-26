import React, { useState } from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectLists } from '../../slices/listsSlice';
import ListName from './ListName';
import AddCard from '../card/AddCard';
import Card from '../card/Card';
import { Scrollbars } from 'react-custom-scrollbars-2';

const useStyles = makeStyles((theme) => ({
  containerTodos: {
    marginBottom: theme.spacing(1),
  },
  trackVertical: {
    background: 'red',
    color: 'red',
    width: 10,
    height: 100,
  },
}))

const List: React.FC = () => {
  const classes = useStyles();
  const lists = useSelector(selectLists);

  return (
    <>
      {
        lists.map((list) => (
          <div key={list.id}>
            <ListName
              list={list}
            />
            <Scrollbars
              autoHideDuration={200}
              autoHeight
              autoHeightMax={'85vh'}
              style={{width: '315px'}}
              className={classes.containerTodos}
            >
              {list.todos.map((todo) => (
                <Card 
                  key={todo.id}
                  idList={list.id}
                  todo={todo}
                />
              ))}
            </Scrollbars>
            <AddCard 
              idList={list.id}
            />
          </div>
          )
        )
      }
    </>
  )
}

export default List;
