import React from 'react';

const serverContext = React.createContext('light');
const { Provider: ServerProvider } = serverContext;

export {
  ServerProvider,
  serverContext
}