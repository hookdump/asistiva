// TODO: Service extending BaseGazeInput, forwarding gaze data from socketIo to GazeCursor
/*
  console.log('subscribing to socket.io events...');
  SocketConnector.on('connection', function() {
    SocketConnector.status = "connected";
    console.log('io connection!');
    $document.unbind("mousemove.asistiva");
  });

  SocketConnector.on('disconnection', function() {
    SocketConnector.status = "disconnected";
    console.log('io disconnection!');
  });

  SocketConnector.on('gaze', function (data) {
    // console.log(data);
    // socket.emit('my other event', { my: 'data' });

    var relativeX = data.x;
    var relativeY = 1-data.y;

    if (service.maxX && service.maxY) {
      var gazeX = 20 + (relativeX * service.maxX) + service.offsetX;
      var gazeY = 20 + (relativeY * service.maxY) + service.offsetY;
      service.moveGaze(gazeX,gazeY);
    } else {
      console.log('I dont have the max coords');
    }

  });
  */
