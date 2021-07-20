import { createTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import blueGrey from '@material-ui/core/colors/blueGrey';
import teal from '@material-ui/core/colors/teal';

const theme0 = createTheme({
  palette: {
    primary: {
      main: purple[900],
    },
    // secondary: {
    //   main: purple[500],
    // },
  },
});

const theme1 = createTheme({
  palette: {
    primary: {
      main: deepPurple[900],
    },
    // secondary: {
    //   main: purple[500],
    // },
  },
});

const theme2 = createTheme({
  palette: {
    primary: {
      main: blueGrey[900],
    },
    // secondary: {
    //   main: purple[500],
    // },
  },
});

const theme3 = createTheme({
  palette: {
    primary: {
      main: teal[900],
    },
    // secondary: {
    //   main: purple[500],
    // },
  },
});


const theme4 = createTheme({
  palette: {
    primary: {
      main: indigo[700],
    },
    // secondary: {
    //   main: purple[500],
    // },
  },
});

export default [
  theme0,
  theme1,
  theme2,
  theme3,
  theme4,
];