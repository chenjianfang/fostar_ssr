import path from 'path';
import React from 'react';
import fs from 'fs';
import nodeEval from 'node-eval';

async function render(pageFile) {
  const entryJS = path.join(pageFile, 'index.js');
  const entryTemplate = path.join(pageFile, 'index.html');
  const entryJSCode = fs.readFileSync(entryJS, 'utf-8');
  const entryTemplateCode = fs.readFileSync(entryTemplate, 'utf-8');
  const { App, ReactDOMServer, getServerSideProps } = nodeEval(entryJSCode, entryJS);
  const { props = {} } = await getServerSideProps();
  const appString = ReactDOMServer.renderToString(
    <App {...props} />
  )
  let htmlString = entryTemplateCode.replace('<!--ssr-->', appString);
  htmlString = htmlString.replace('<!--server-data-->', `<script>window.SERVER_DATA=${JSON.stringify(props)}</script>`);

  return htmlString;
}

export default render;