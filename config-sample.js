
var fs = require('fs')

//local setting
module.exports = {
	portServer: 7413
	,portWsServer: 7414
	,localServer: 'http://127.0.0.1:7504'
	,env: 'dev'
	,listenAddrServer: '127.0.0.1' //localhost or 192.168.1.26 or whatever proper
	,siteName: 'zproxy'
	,serverWsAddr: '127.0.0.1'

	//* if use ssl
	,sslOption: {
		ssl: {
			key: fs.readFileSync(__dirname + '/test/cert/test.key.pem')
			,cert: fs.readFileSync(__dirname + '/test/cert/test.server.pem')
		}
		,portServer: 7300
	}
	//*/
}
