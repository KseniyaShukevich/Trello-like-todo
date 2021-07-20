import React from 'react';
import ToolBar from './components/toolbar/ToolBar';
import Main from './components/main/Main';
import { useSelector } from 'react-redux';
import { selectTheme } from './slices/Themeslice';
import { ThemeProvider } from '@material-ui/core/styles';
import themes from './components/toolbar/themes/themes';

const App: React.FC = () => {
  const theme = useSelector(selectTheme);

  return(
    <ThemeProvider theme={themes[theme]}>
      <ToolBar />
      <Main />
    </ThemeProvider>
  )
}

export default App;
