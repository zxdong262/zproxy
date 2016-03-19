'use strict'

let
koa = require('koa')
,app = koa()
,bodyParser = require('koa-bodyparser')
,conditional = require('koa-conditional-get')
,tools = require('../lib/tools')
,log = tools.log
,err = tools.err
,config = require('../config-sample')
,ports = config.localServer.split(':')
,port = parseInt(ports[ports.length - 1], 10)

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

app.listen(port, () => {
	log('test server runs on', port)
})