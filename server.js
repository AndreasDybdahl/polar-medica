var path = require('path'),
    fs = require('fs');

function staticFile(p, mime) {
  return function(req, res, next) {
    if(req.url.substring(1) === p) {
      returnFile(req, res, path.join(__dirname, p), mime);
      return;
    }

    next();
  };
}

function returnFile(req, res, file, mime, prepend) {
  fs.stat(file, function(err, stat) {
    if(err) {
      res.write(err);
      res.end();
      return;
    }

    var size = stat.size;
    var buffer = prepend ? new Buffer(prepend, 'utf-8') : null;
    if (buffer) size += prepend.length;

    res.writeHead(200, {
      'Content-Type': mime,
      'Content-Length': size
    });

    if (buffer) res.write(buffer);

    var readStream = fs.createReadStream(file);
    readStream.pipe(res);
  });
}

module.exports = {
  startServer: function(config, callback) {
    var connect = require('connect'),
        static = require('serve-static'),
        compression = require('compression'),
        http = require('http');


    var app = connect();
    var port = process.env.PORT || config.server.port || 3000;


    // gzip/deflate outgoing responses
    app.use(compression());
    app.use('/lib', static('lib'));
    app.use('/jspm_packages', static('jspm_packages'));
    app.use(staticFile('config.js', 'text/javascript'));
    app.use(function(req, res, next) {
      if (req.url.indexOf('/lib') === 0) {
        res.writeHead(404, 'Not Found');
        res.end();
        return;
      }

      next();
    });

    var indexFile = path.join(__dirname, 'index.html');
    app.use(function(req, res) {
      returnFile(req, res, indexFile, 'text/html', '<script src="/socket.io/socket.io.js"></script>\n<script src="/lib/reload-client.js"></script>\n');
    });


    // start it up
    var server = app.listen(port, function() {
      console.log('Express server listening on port ' + port);
    });

    callback(server);
  }
};