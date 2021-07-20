import React from 'react';
import ReactDom from 'react-dom';
import store from './app/store';
import { Provider } from 'react-redux';
import App from './App';

const Page: React.FC = () => {

  return (
    <Provider store={store}>
        <App />
    </Provider>
  );
};

ReactDom.render(<Page />, document.getElementById('root'));
