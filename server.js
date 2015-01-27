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

function returnFile(req, res, file, mime) {
  fs.stat(file, function(err, stat) {
    if(err) {
      res.write(err);
      res.end();
      return;
    }

    res.writeHead(200, {
      'Content-Type': mime,
      'Content-Length': stat.size
    });

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
      returnFile(req, res, indexFile, 'text/html');
    });


    // start it up
    var server = app.listen(port, function() {
      console.log('Express server listening on port ' + port);
    });

    callback(server);
  }
};