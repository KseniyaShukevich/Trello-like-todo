import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SearchResult from './search/SearchResult';
import SearchField from './search/SearchField';
import NavMenu from './NavMenu';
import { searchTodos } from '../../slices/listsSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'space-between',
    position: 'fixed',
    boxSizing: 'border-box',
    width: '100vw',
    zIndex: 100,
  },
  header: {
    position: 'absolute',
    left: 'calc(50% - 49px)',
    lineHeight: '48px',
    fontFamily: 'Kavivanar, cursive',
    fontSize: 20,
  },
}));

const ToolBar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [textSearch, setTextSearch] = useState<string>('');
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);

  const closeSearch = (): void => {
    dispatch(searchTodos(''));
    setTextSearch('');
    setIsOpenSearch(false);
  }

  return (
    <>
      <SearchResult 
        isOpen={isOpenSearch}
        closeSearch={closeSearch}
      />
      <Toolbar variant='dense' className={classes.toolbar}>
        <SearchField
          isOpen={isOpenSearch}
          text={textSearch}
          setText={setTextSearch}
          closeSearch={closeSearch}
          setIsOpen={setIsOpenSearch}
        />
        <Typography className={classes.header}>
          Todo Board
        </Typography>
        <div>
          <NavMenu/>
        </div>
      </Toolbar>
    </>
  );
};

export default ToolBar;
