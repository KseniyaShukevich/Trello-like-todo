import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../slices/Themeslice';

const useStyles = makeStyles(() => ({
  main: {
    minHeight: 'calc(100vh - 48px)',
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
      fsdf
    </main>
  )
}

export default Main;