import React from 'react';
import './App.scss';

import { Outlet } from 'react-router-dom'

function App() {
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Skola</title>
    </head>
    <body>
    <div className="App">
      <main>
        <Outlet />
      </main>
    </div>
    </body>
    </html>
    
  );
}

export default App;
