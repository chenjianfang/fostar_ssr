import React from 'react';
import ReactDOMServer from 'react-dom/server';
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

export {
  App,
  ReactDOMServer,
  getServerSideProps,
};
