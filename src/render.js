import path from 'path';
import fs from 'fs';
import nodeEval from 'node-eval';

async function render(pageFile, ctx) {
  const entryJS = path.join(pageFile, 'index.js');
  const entryTemplate = path.join(pageFile, 'index.html');

  const entryJSCode = fs.readFileSync(entryJS, 'utf-8');
  const entryTemplateCode = fs.readFileSync(entryTemplate, 'utf-8');

  const { getServerSideProps, serverRender } = nodeEval(entryJSCode, entryJS);
  let props = {};
  if (typeof getServerSideProps === 'function') {
    try {
      ({ props } = await getServerSideProps());
    } catch (err) {
    }
  }
  const appString = serverRender({ props, req: ctx.req });
  let htmlString = entryTemplateCode.replace('<!--ssr-->', appString);
  htmlString = htmlString.replace('<!--server-data-->', `<script>window.SERVER_DATA=${JSON.stringify(props)}</script>`);

  return htmlString;
}

export default render;