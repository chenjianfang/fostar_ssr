import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { ServerProvider } from 'stores/server'
import { post } from 'utils/http';
import App from './App';
import 'styles/home/index.css';

async function getServerSideProps(context) {
  const menu = await post('http://127.0.0.1:3001/getMenu');
  return {
    props: {
      menu
    }
  }
}

if (process.env.IS_CLIENT) {
  hydrateRoot(document.getElementById('root'), (
    <ServerProvider value={{
      ...window.SERVER_DATA
    }}>
      <App />
    </ServerProvider>
  ));
}

function serverRender({ props, req }) {
  return ReactDOMServer.renderToString(
    <ServerProvider value={{
      req,
      ...props
    }}>
      <App />
    </ServerProvider>
  )
}

export {
  serverRender,
  getServerSideProps,
};
