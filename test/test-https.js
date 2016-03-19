'use strict'

var assert = require('assert')
,util = require('util')
,config = require('../config')
,request = require('request')
,co = require('co')
,tools = require('../lib/tools')
,log = tools.log
,err = tools.err
,fs = require('fs')
,path = require('path')
,exec0 = require('child_process').exec
,exec = function(cmd, option) {

	return new Promise(function(resolve, reject) {
		exec0(cmd, option, function(err, stdout, stderr) {
			if(err) reject(err)
			else resolve({
				stdout: stdout
				,stderr: stderr
			})
		})
	})

}
,wait = function(ms) {

	return new Promise(function(resolve, reject) {
		setTimeout(function(){
			resolve()
		}, ms)
	})

}
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

describe(config.siteName, function() {

	this.timeout(500000)

	it('https post/get', function(done) {

		co(postGetHttps())
		.then(ok, error)

		function ok() {
			done()
		}
		function error(e) {
			err(e)
			process.exit(0)
		}

	})


})

function* postGetHttps() {

	//request
	var url = 'https://'  + config.listenAddrServer + ':' + config.sslOption.portServer + '?bar=foo'
	console.log(url)
	let opt = {
		uri: url
		,method: 'post'
		,body: {
			foo: 'bar'
		}
		,json: true
		,strictSSL: false
	}

	var res = yield qr(opt)

	assert(res.body.body.foo === 'bar' && res.body.query.bar === 'foo')

	return Promise.resolve()

}



