import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, alpha } from '@material-ui/core/styles';
import AddCard from './AddCard';
import { useDispatch, useSelector } from 'react-redux';
import { selectLists } from '../../slices/listsSlice';

const useStyles = makeStyles((theme) => ({
  name: {
    width: '300px',
    height: '36px',
    textAlign: 'center',
    lineHeight: '36px',
    background: theme.palette.secondary.main,
  },
  card: {
    width: '300px',
    height: '200px',
    background: alpha(theme.palette.common.white, 0.9),
  },
}))

const List: React.FC = () => {
  const classes= useStyles();
  const lists = useSelector(selectLists);

  return (
    <>
      {
        lists.map((list, index) => (
            <Grid container justifyContent="center" direction="column" spacing={1} key={index} style={{width: '315px'}}>
              <Grid item>
                <Paper className={classes.name}>
                  {list.name}
                </Paper>
              </Grid>
              {list.todos.map((value) => (
                <Grid key={value} item>
                  <Paper className={classes.card} />
                </Grid>
              ))}
              <Grid item>
                <AddCard />
              </Grid>
            </Grid>
          )
        )
      }
    </>
  )
}

export default List;
