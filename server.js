
/**
 * server.js
 */
'use strict'

let
//user local
config = require('./config')
,WebSocketServer = require('ws').Server
,http = require('http')
,https = require('https')
,wss = new WebSocketServer({ 
	port: config.portWsServer 
	,host: config.listenAddrServer
})
,tools = require('./lib/tools')
,log = tools.log
,err = tools.err
,koa = require('koa')
,app = koa()
,bodyParser = require('koa-bodyparser')
,conditional = require('koa-conditional-get')
,nid = require('shortid').generate
var cache = new WeakSet()

var wsg, sendToWs

app.use(conditional())
app.use(bodyParser())

//route
app.use(function *(next) {

	let id = nid()
	let info = {
		path: this.originalUrl
		,method: this.method
		,headers: this.headers
		,body: this.request.body
		,id: id
	}
	let th = this
	//if ws not connected
	if(!wsg) {
		return this.body = 'web socket not ready'
	}

	var msg0 = JSON.stringify(info)

	wsg.send(msg0)

	var res = yield waitForRes(id)

	removeData(id)

	this.body = res

})

function waitForRes(id) {

	return new Promise(function(resolve, reject) {
		var handle = setTimeout(loop, 50)
		function loop() {
			if(cache[id]) return resolve(cache[id])
			else handle = setTimeout(loop, 10)	
		}
	})

}

function removeData(id) {
	delete cache[id]
}

//ref to ws eventEmitter

wss.on('connection', function connection(ws) {
	wsg = ws
	wsg.on('message', function (msg) {
		var obj = JSON.parse(msg.toString())
		cache[obj.id] = obj.body
	})
})

http.createServer(app.callback()).listen(config.portServer, config.listenAddrServer, function() {
	log(config.siteName, 'http server runs on port', config.portServer)
	log(config.siteName, 'ws server runs on port', config.portWsServer)
})

if(config.sslOption) {
	https.createServer(config.sslOption.ssl, app.callback()).listen(config.sslOption.portServer, config.listenAddrServer, function() {
		log(config.siteName, 'https server runs on port', config.sslOption.portServer)
	})
}







