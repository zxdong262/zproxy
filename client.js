
/**
 * server.js
 */
'use strict'

let
//user local
config = require('./config')
,WebSocket = require('ws')
,wsUri = 'ws://' + config.serverWsAddr + ':' + config.portWsServer
,ws = new WebSocket(wsUri, {
	protocolVersion: 13,
})
,tools = require('./lib/tools')
,log = tools.log
,err = tools.err
,request = require('request')
,qr = function(args) {

	return new Promise(function(resolve, reject) {
		request(args, function(err, response, body) {
			if(err) reject(err)
			else resolve({
				response: response
				,body: body
			})
		})
	})
	
}
,co = require('co')

log(config.siteName, 'client', 'start at:', wsUri)

ws.on('open', () => {
	log('connected to', wsUri)
})

ws.on('close', () => {
	log('disconnected')
})

ws.on('error', (e) => {
	err(e)
})

ws.on('message', function message(data, flags) {

	var opt = JSON.parse(data.toString())

	var opt0 = {
		uri: config.localServer + opt.path
		,headers: opt.headers
		,method: opt.method
		,body: opt.body
		,json: true
		,strictSSL: false
	}
	console.log(opt0)
	co(qr(opt0))
	.then(ok, error)

	function ok(res) {
		var body = res.body
		let obj = {
			body: body
			,id: opt.id
		}
		console.log(body)
		let str = JSON.stringify(obj)
		ws.send(str, { mask: true })
	}

	function error(e) {
		err(e)
	}


})