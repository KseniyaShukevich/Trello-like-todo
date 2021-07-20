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

const useStyles = makeStyles((theme) => ({
  toolbar: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'space-between',
    position: 'fixed',
    boxSizing: 'border-box',
    width: '100vw',
  },
  header: {
    position: 'absolute',
    left: '50%',
    lineHeight: '48px',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
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
}));

const ToolBar: React.FC = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Toolbar variant='dense' className={classes.toolbar}>
      <DialogThemes 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
        <Typography className={classes.header}>
          Todo Board
        </Typography>
      <div>
        <IconButton color='inherit'>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton color='inherit'>
          <NavigateNextIcon />
        </IconButton>
        <IconButton color='inherit'>
          <AddIcon />
        </IconButton>
        <IconButton 
          color='inherit' 
          onClick={() => setIsOpen(true)} 
        >
          <PaletteIcon />
        </IconButton>
      </div>
    </Toolbar>
  );
};

export default ToolBar;
