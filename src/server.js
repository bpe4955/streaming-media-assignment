const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getPage,
  '/page2': htmlHandler.getPage,
  '/page3': htmlHandler.getPage,
  '/party.mp4': mediaHandler.getMedia,
  '/bird.mp4': mediaHandler.getMedia,
  '/bling.mp3': mediaHandler.getMedia,
  index: htmlHandler.getPage,
};

const onRequest = (request, response) => {
  console.log(request.url);

  const parsedURL = url.parse(request.url);

  if (urlStruct[parsedURL.pathname]) {
    urlStruct[parsedURL.pathname](request, response);
  } else {
    htmlHandler.getPage(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
