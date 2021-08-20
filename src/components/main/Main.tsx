import React from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import AddList from '../list/AddList';
import Lists from '../list/Lists';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: 8,
      backgroundColor: alpha(theme.palette.secondary.main, 0.3),
      borderRadius: theme.shape.borderRadius,
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
      boxShadow: 'inset 1px 1px 10px #f3faf7',
    },
  },
  main: {
    paddingTop: theme.spacing(7),
    height: '100vh',
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    minWidth: '100vw',
    width: 'fit-content',
  }
}));

interface IProps {
  theme: number,
}

const Main: React.FC<IProps> = ({
  theme,
}) => {
  const classes = useStyles();

  return (
    <main
      className={classes.main}
      style={{
        background: `url(./background${theme}.jpg) center center / cover fixed`,
        transition: '0.3s',
      }}
    >
      <Lists />
      <AddList />
    </main>
  )
}

export default Main;