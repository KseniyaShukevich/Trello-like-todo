import React from 'react';
import ReactDom from 'react-dom';
import ToolBar from './ToolBar';
import Main from './Main';
import theme from './themes';
// import { ThemeProvider } from '@material-ui/core/styles';

const App: React.FC = () => {
  const a = 10;

  return (
    <>
       {/* <ThemeProvider theme={theme}> */}
        <ToolBar />
        <Main />
      {/* </ThemeProvider> */}
      </>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
