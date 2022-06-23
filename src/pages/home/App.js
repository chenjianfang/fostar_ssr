import React, { useContext } from 'react';

import { serverContext } from 'stores/server';

function App() {
  const { menu } = useContext(serverContext);

  return (
    <div id="App">111
      {
        menu.map((item) => <span key={item}>{item}</span>)
      }
      <div>--------</div>
      <div>--------</div>
    </div>
  );
}

export default App;
