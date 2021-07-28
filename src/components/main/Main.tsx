import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { selectTheme } from '../../slices/themeslice';
import AddList from '../list/AddList';
import Lists from '../list/Lists';
import { useDispatch, useSelector } from 'react-redux'; 
import { selectLists } from '../../slices/listsSlice';

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: '56px',
    height: '100%',
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    width: '100%',
  }
}));

const Main: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  // const onKeyup = (e: KeyboardEvent): void => {
  //   dispatch(setKeyup(e.code));
  // }

  // useEffect(() => {
  //   window.addEventListener('keyup', (e) => onKeyup(e));
  // }, []);

  return (
    <main 
      className={classes.main}
      style={{
        background: `url(./background${theme}.jpg) center center / cover fixed`, 
        transition: '0.5s',
      }}
    >
      <Lists />
      <AddList />
    </main>
  )
}

export default Main;