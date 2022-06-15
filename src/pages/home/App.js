import React, { useEffect, useState } from 'react';
function App(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(4444)
  }, [])

  return (
    <div id="App">{count}
      {
        props.menu.map((item) => <span key={item}>{item}</span>)
      }
    </div>
  );
}

export default App;
