import React from 'react';
import ReactDom from 'react-dom';
import ToolBar from './ToolBar';

const App: React.FC = () => {
  const a = 10;

  return (
    <ToolBar />
  );
};

ReactDom.render(<App />, document.getElementById('root'));
