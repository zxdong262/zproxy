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
,config = require('../config')
,ports = config.localServer.split(':')
,port = parseInt(ports[ports.length - 1], 10)
,https = require('https')
,portHttps = port
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

https.createServer(ssl, app.callback()).listen(portHttps, function() {
	log(config.siteName, 'https server runs on port', portHttps)
})

