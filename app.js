/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , path = require('path');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000 );
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

server.listen(app.get('port'),function(){
  console.log('Express server listening on port ' + app.get('port'));
});
app.use(express.logger('dev'));

app.get('/', routes.index);

io.sockets.on('connection', function (socket) {
  socket.broadcast.emit('connected', socket.id );
  socket.on('message', function (data) {
        socket.broadcast.emit('message', {
                id: socket.id,
                msg: data
        });
  });

  socket.on('disconnected',function(data){
        io.sockets.emit('disconnected',socket.id);
  });
});
