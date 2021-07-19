import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: 'calc(100vh - 48px)',
    background: 'url(./background4.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
}));

const Main: React.FC = () => {
  const a = 10;
  const classes = useStyles();

  return (
    <main className={classes.main}>
      fsdf
    </main>
  )
}

export default Main;