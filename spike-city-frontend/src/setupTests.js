import '@testing-library/jest-dom';
import mockServer from './__mocks__/mockServer';

process.env.REACT_APP_API_BASE_URL = 'http://localhost:5001';

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

console.log('API base url in test:', process.env.REACT_APP_API_BASE_URL);

import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = global.TextEncoder || TextEncoder;
global.TextDecoder = global.TextDecoder || TextDecoder;

if (typeof fetch === 'undefined') {
  const fetchPkg = require('node-fetch');

  global.fetch = fetchPkg;
  global.Headers = fetchPkg.Headers;
  global.Request = fetchPkg.Request;
  global.Response = fetchPkg.Response;
}
