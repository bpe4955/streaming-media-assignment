const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const page2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const page3 = fs.readFileSync(`${__dirname}/../client/client3.html`);

const urlStruct = {
  '/': index,
  '/page2': page2,
  '/page3': page3,
};

// const getIndex = (request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/html' });
//   response.write(index);
//   response.end();
// };

// const getPage2 = (request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/html' });
//   response.write(page2);
//   response.end();
// };

const getPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  if (urlStruct[request.url]) {
    response.write(urlStruct[request.url]);
  } else {
    response.write(index);
  }
  response.end();
};

module.exports = { getPage };
