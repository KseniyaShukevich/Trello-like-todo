import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { selectTheme } from '../../slices/themeslice';
import AddList from '../list/AddList';
import Lists from '../list/Lists';
import { useSelector } from 'react-redux'; 

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: '56px',
    height: '100%',
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    minWidth: '100vw',
    width: 'fit-content',
  }
}));

const Main: React.FC = () => {
  const classes = useStyles();
  const theme = useSelector(selectTheme);

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