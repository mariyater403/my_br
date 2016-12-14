# File: components/Forwarder.coffee
noflo = require "noflo"

exports.getComponent = ->
  component = new noflo.Component
  component.description = "This component receives data on a single input
  port and sends the same data out to the output port"

  # Register ports and event handlers
  component.inPorts.add 'in', datatype: 'array', (event, payload) ->
  switch event
    when 'data'
      sum = 1.23
      component.outPorts.out.send sum
    when 'disconnect'
      component.outPorts.out.disconnect()
      component.outPorts.add 'out', datatype: 'number'
  component # Return new instance