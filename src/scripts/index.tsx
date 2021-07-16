import React from 'react';
import ReactDom from 'react-dom';
import { Button } from '@material-ui/core';

const App: React.FC = () => (
  <Button variant="contained" color="primary">Hello</Button>
);

ReactDom.render(<App/>, document.getElementById('root'));
