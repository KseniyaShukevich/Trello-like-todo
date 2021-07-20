import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../slices/themeslice';
import AddList from '../cardsManager/AddList';
import List from '../cardsManager/List';

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: 'calc(100vh - 64px)',
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'flex-start',
  }
}));

const Main: React.FC = () => {
  const classes = useStyles();
  const theme = useSelector(selectTheme);

  return (
    <main 
      className={classes.main}
      style={{
        background: `url(./background${theme}.jpg) center center / cover`, 
        transition: '0.5s',
      }}
    >
      <List />
      <AddList />
    </main>
  )
}

export default Main;