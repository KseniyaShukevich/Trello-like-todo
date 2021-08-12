import { createTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import teal from '@material-ui/core/colors/teal';
import lime from '@material-ui/core/colors/lime';
import brown from '@material-ui/core/colors/brown';
import grey from '@material-ui/core/colors/grey';

const theme0 = createTheme({
  palette: {
    primary: {
      main: lime[900],
    },
    secondary: {
      main: lime[200],
    },
  },
});

const theme1 = createTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: grey[500],
    },
  },
});

const theme2 = createTheme({
  palette: {
    primary: {
      main: blueGrey[800],
    },
    secondary: {
      main: blueGrey[200],
    },
  },
});

const theme3 = createTheme({
  palette: {
    primary: {
      main: teal[900],
    },
    secondary: {
      main: teal[200],
    },
  },
});


const theme4 = createTheme({
  palette: {
    primary: {
      main: brown[700],
    },
    secondary: {
      main: brown[100],
    },
  },
});

export default [
  theme0,
  theme1,
  theme2,
  theme3,
  theme4,
];