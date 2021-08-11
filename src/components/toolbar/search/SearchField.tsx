import React, { ChangeEvent } from "react";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { searchTodos } from '../../../slices/listsSlice';
import CloseIcon from '@material-ui/icons/Close';
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
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

interface IProps {
  isOpen: boolean,
  text: string,
  closeSearch: () => void,
  setText: (value: string) => void,
  setIsOpen: (value: boolean) => void,
}

const SearchField: React.FC<IProps> = ({
  isOpen,
  text,
  closeSearch,
  setText,
  setIsOpen,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const changeTextSearch = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setText(e.target.value);
    dispatch(searchTodos(e.target.value));
  }

  const handleFocus = (): void => {
    setIsOpen(true);
  }

  const closeSearchResult = ({ target }: any) => {
    const isParentSearchResult: boolean = target.closest('.search-result');
    const isParentSearchInput: boolean = target.closest('.search-input');

    if (target && !isParentSearchResult && !isParentSearchInput) {
      closeSearch();
    }
  }

  useEffect(() => {
    document.addEventListener('click', closeSearchResult);

    return () => {
      document.removeEventListener('click', closeSearchResult);
    }
  }, []);

  return (
    <div className={classes.search + ' search-input'}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        value={text}
        onChange={(e) => changeTextSearch(e)}
        onFocus={handleFocus}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      {
        isOpen && (
          <div 
            className={classes.buttonCloseSearch}
            onClick={closeSearch}
          >
            <CloseIcon color='inherit' />
          </div>
        )
      }
    </div>
  )
}

export default SearchField;
