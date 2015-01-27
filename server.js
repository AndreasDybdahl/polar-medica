var connect = require('connect'),
    static = require('serve-static'),
    http = require('http'),
    path = require('path');

console.log('imported');

module.exports = {
  startServer: function(config, callback) {
    var app = connect();
    var port = process.env.PORT || config.server.port || 3000;


    // gzip/deflate outgoing responses
    var compression = require('compression');
    app.use(compression());
    app.use('/lib', static('lib'));
    app.use(function(req, res) {
      res.sendFile(path.join(__dirname, 'index.html'))
    });


    // start it up
    var server = app.listen(port, function() {
      console.log('Express server listening on port ' + port);
    });

    callback(server);
  }
};