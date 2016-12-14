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
				sum = 0.0
				#countdown = (num for num in [10..1])
				#hgkures = 'dfsvfs'
				for i in [0..payload.length-1]
					sum += parseFloat(payload[i][0])
				component.outPorts.out.send sum
			when 'disconnect'
				#Disconnect output port when input port disconnects
				component.outPorts.out.disconnect()
	component.outPorts.add 'out', datatype: 'number'

	component # Return new instance