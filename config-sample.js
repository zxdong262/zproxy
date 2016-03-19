
//local setting
module.exports = {
	portServer: 7213
	,portWsServer: 7214
	,localServer: 'http://127.0.0.1:7204'
	,env: 'dev'
	,listenAddrServer: '127.0.0.1' //localhost or 192.168.1.26 or whatever proper
	,siteName: 'io-proxy'
	,serverWsAddr: '127.0.0.1'

	/* if use ssl
	,sslOption: {
		ssl: {
			key: fs.readFileSync('local/cert/your-server.key.pem')
			,cert: fs.readFileSync('local/cert/your-server.server.pem')
		}
		,portServer: 7300
	}
	*/
}
