import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import DialogThemes from './themes/DialogThemes';
import PaletteIcon from '@material-ui/icons/Palette';
import { useDispatch, useSelector } from 'react-redux';
import { backHistoryPoint, forwardHistoryPoint } from '../../slices/historySlice';
import { selectTrackHistory, selectHistory } from '../../slices/historySlice';
import { ChangeEvent } from 'react';
import SearchResult from './search/SearchResult';
import { searchTodos } from '../../slices/listsSlice';
import CloseIcon from '@material-ui/icons/Close';

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
    left: '50%',
    lineHeight: '48px',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  buttonCloseSearch: {
    height: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
    '&:hover': {
      cursor: 'pointer',
    }
  },
}));

const ToolBar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isOpenThemes, setIsOpenThemes] = useState<boolean>(false);
  const trackHistory = useSelector(selectTrackHistory);
  const historyTodo = useSelector(selectHistory);
  const [textSearch, setTextSearch] = useState<string>('');
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);

  const moveBack = (): void => {
    dispatch(backHistoryPoint());
  }

  const moveForward = (): void => {
    dispatch(forwardHistoryPoint());
  }

  const changeTextSearch = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setTextSearch(e.target.value);
    dispatch(searchTodos(e.target.value));
  }

  const closeSearch = (): void => {
    setTextSearch('');
    setIsOpenSearch(false);
  }

  return (
    <>
      <SearchResult 
        isOpen={isOpenSearch}
        setIsOpen={setIsOpenSearch}
        setTextSearch={setTextSearch}
      />
      <Toolbar variant='dense' className={classes.toolbar}>
        <DialogThemes 
          isOpen={isOpenThemes}
          setIsOpen={setIsOpenThemes}
        />

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            value={textSearch}
            onChange={(e) => changeTextSearch(e)}
            onFocus={() => setIsOpenSearch(true)}
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
          {
            isOpenSearch && (
              <div 
                className={classes.buttonCloseSearch}
                onClick={closeSearch}
              >
                <CloseIcon color='inherit' />
              </div>
            )
          }
        </div>

          <Typography className={classes.header}>
            Todo Board
          </Typography>
        <div>
          <IconButton 
            color='inherit'
            disabled={trackHistory === 0 ? true : false}
            onClick={moveBack}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton 
            color='inherit'
            disabled={trackHistory === historyTodo.length - 1 ? true : false}
            onClick={moveForward}
          >
            <NavigateNextIcon />
          </IconButton>
          <IconButton color='inherit'>
            <AddIcon />
          </IconButton>
          <IconButton 
            color='inherit' 
            onClick={() => setIsOpenThemes(true)} 
          >
            <PaletteIcon />
          </IconButton>
        </div>
      </Toolbar>
    </>
  );
};

export default ToolBar;
