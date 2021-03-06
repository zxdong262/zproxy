'use strict'

let
koa = require('koa')
,fs = require('fs')
,app = koa()
,bodyParser = require('koa-bodyparser')
,conditional = require('koa-conditional-get')
,tools = require('../lib/tools')
,log = tools.log
,err = tools.err
,config = require('../config-sample')
,ports = config.localServer.split(':')
,port = parseInt(ports[ports.length - 1], 10)
,http = require('http')
,https = require('https')
,portHttps = port + 1
,ssl = {
	key: fs.readFileSync(__dirname + '/cert/test.key.pem')
	,cert: fs.readFileSync(__dirname + '/cert/test.server.pem')
}
app.use(conditional())
app.use(bodyParser())

app.use(function* (next) {

	let info = {
		path: this.path
		,method: this.method
		,headers: this.headers
		,body: this.request.body
		,query: this.query
	}

	this.body = info

})

http.createServer(app.callback()).listen(port, function() {
	log(config.siteName, 'test http server runs on port', port)
})

https.createServer(ssl, app.callback()).listen(portHttps, function() {
	log(config.siteName, 'https server runs on port', portHttps)
})

