import React from 'react';
import ReactDom from 'react-dom';

const App: React.FC = () => {
  return (
    <div> Hello</div>
  )
}

ReactDom.render(<App/>, document.getElementById('root'));
