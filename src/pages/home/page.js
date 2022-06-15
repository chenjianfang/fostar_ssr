import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App';
import { post } from 'utils/http';
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

  hydrateRoot(document.getElementById('root'), <App {...window.SERVER_DATA} />);
}

export {
  App,
  ReactDOMServer,
  getServerSideProps,
};
