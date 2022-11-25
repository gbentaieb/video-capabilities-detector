import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = ReactDOM.createRoot(document.createElement('div'));
  div.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});