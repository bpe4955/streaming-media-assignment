const fs = require('fs');
const path = require('path');

const getMedia = (request, response) => {
  const file = path.resolve(__dirname, `../client${request.url}`);
  const MIME = String(request.url).includes('.mp3') ? 'audio/mpeg' : 'video/mp4';

  fs.stat(file, (err, stats) => {
    // Error Checking
    if (err) {
      if (err.code === 'ENOENT') { response.writeHead(404); }
      return response.end(err);
    }

    // Get the range of bytes to send
    let { range } = request.headers; // let range = resquest.headers.range;
    if (!range) { range = 'bytes=0-'; }

    // Store the range in different variables
    const positions = range.replace(/bytes=/, '').split('-');

    let start = parseInt(positions[0], 10);
    const total = stats.size;
    // let end; if(positions[1]) { end = parseInt(positions[1], 10) } else { end = total - 1; }
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) { start = end - 1; }

    const chunksize = (end - start) + 1;

    // Send headers back to the client
    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': `${MIME}`,
    });

    const stream = fs.createReadStream(file, { start, end });

    stream.on('open', () => {
      stream.pipe(response);
    });

    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });

    return stream;
  });
};

module.exports = { getMedia };
