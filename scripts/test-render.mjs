import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from '../src/App.jsx';

globalThis.window = {
  location: { search: '?preview=true', origin: 'http://localhost:3000' },
  addEventListener: () => {},
  removeEventListener: () => {}
};
globalThis.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};
globalThis.fetch = async () => ({ ok: false });
globalThis.document = {
  getElementById: () => null
};

try {
  const html = ReactDOMServer.renderToString(React.createElement(App));
  console.log('SUCCESS! Rendered characters:', html.length);
} catch (e) {
  console.error('RENDER ERROR:', e);
}
