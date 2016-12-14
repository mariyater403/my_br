// File: components/Forwarder.js
var noflo = require("noflo");
var rpc = require('node-json-rpc');
var options = {
    // int port of rpc server, default 5080 for http or 5433 for https
    port: 5000,
    // string domain name or ip of rpc server, default '127.0.0.1'
    host: '192.168.101.40',
    // string with default path, default '/'
    path: '/',
    // boolean false to turn rpc checks off, default true
    strict: true
};
var client = new rpc.Client(options);
var sum = 0;

exports.getComponent = function() {
  var component = new noflo.Component;
  component.description = "This component receives data on a single input\
  port and sends the same data out to the output port";

  // Register ports and event handlers
  component.inPorts.add('in', { datatype: 'array' }, function(event, payload) {
      switch (event) {
          case 'data':
              // Forward data when we receive it.
              // Note: send() will connect automatically if needed
              for (i = 0; i < payload.length; i++) {
                  sum+= parseFloat(payload[i][0]);
              }
              /*client.call(
                {"jsonrpc": "2.0", "method": "option_price", "params": [16, 0.5, 14, 'call'], "id": 0},
                function (err, res) {
                  if (err) { console.log(err); }
                  else {
                    console.log(res["result"][1]);
                    sum = res["result"][1];
                    console.log(sum);
                    console.log('sdfs', component.outPorts.out.send(sum));
                    return component.outPorts.out.disconnect();
                  }
                }
              );*/

              return component.outPorts.out.send(0.2);
          case 'disconnect':
              // Disconnect output port when input port disconnects
              return component.outPorts.out.disconnect();
      }
  });
  component.outPorts.add('out', { datatype: 'number' });

  return component; // Return new instance
};