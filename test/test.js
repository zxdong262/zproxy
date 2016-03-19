'use strict'

var assert = require('assert')
,util = require('util')
,config = require('../config-sample')
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

	//test id
	//const id = new Date().getTime()
/*
	it('init server', function(done) {

		co(initServer(id))
		.then(ok, error)

		function ok() {
			done()
		}
		function error(e) {
			err(e)
			process.exit(0)
		}

	})
*/

	it('post/get', function(done) {

		co(postGet())
		.then(ok, error)

		function ok() {
			done()
		}
		function error(e) {
			err(e)
			process.exit(0)
		}

	})

/*
	it('get data', function(done) {

		co(getData())
		.then(ok, error)

		function ok() {
			//recover(id)
			done()
		}
		function error(e) {
			err(e)
			process.exit(0)
		}

	})
*/

})

function* postGet() {

	//request
	let opt = {
		uri: 'http://'  + config.listenAddrServer + ':' + config.portServer + '?bar=foo'
		,method: 'post'
		,body: {
			foo: 'bar'
		}
		,json: true
	}

	var res = yield qr(opt)

	assert(res.body.body.foo === 'bar' && res.body.query.bar === 'foo')

	return Promise.resolve()

}



