import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, alpha } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectLists } from '../../slices/listsSlice';
import ListName from './ListName';
import AddCard from '../card/AddCard';
import Card from '../card/Card';

const useStyles = makeStyles((theme) => ({
  // card: {
  //   width: '300px',
  //   height: '200px',
  //   background: alpha(theme.palette.common.white, 0.9),
  // },
}))

const List: React.FC = () => {
  const classes = useStyles();
  const lists = useSelector(selectLists);

  return (
    <>
      {
        lists.map((list) => (
            <Grid container justifyContent="center" direction="column" spacing={1} key={list.id} style={{width: '315px'}}>
              <Grid item>
                <ListName
                  list={list}
                />
              </Grid>
              {list.todos.map((todo) => (
                <Grid key={todo.id} item>
                  <Card 
                    listId={list.id}
                    todo={todo}
                  />
                </Grid>
              ))}
              <Grid item>
                <AddCard 
                  listId={list.id}
                />
              </Grid>
            </Grid>
          )
        )
      }
    </>
  )
}

export default List;
