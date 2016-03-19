# zproxy
a app proxy http(s) post/get from server to local server.

## how it works

```java
remote request--http(s) request--> zproxy server --web socket--> local websocket client -->
--http(s)--> local http(s) server  -->

--http(s) response--> local websocket client --web socket--> zproxy server 
--http(s) response--> remote request 
```

## limited power
it has limited power, can only handle post/get http(s) request, and only one request once, so, can be used at some test cases only.

## how to use

```bash
git clone git@github.com:zxdong262/zproxy.git
cd zproxy
cp config-sample.js config.js
npm i
```

then edit `config.js`
```javascript

//local setting
module.exports = {
    portServer: 7213 //server http server port
    ,portWsServer: 7214 //server websocket port
    ,localServer: 'http://127.0.0.1:7204' //local server addr
    ,listenAddrServer: '127.0.0.1' //server http server listen address
    ,siteName: 'zproxy' //sitename
    ,serverWsAddr: '127.0.0.1' //server websocket listen address

    /* if use ssl
    ,sslOption: {
        ssl: {
            key: fs.readFileSync('path/to/your-server.key.pem')
            ,cert: fs.readFileSync('path/to/your-server.server.pem')
        }
        ,portServer: 7300
    }
    */
}

```

run the server 
```bash
node server
```

run the client 
```bash
node client
```

## test
```bash
git clone git@github.com:zxdong262/zproxy.git
cd zproxy
npm i

#test http
cp config-sample.js config.js
node server.js
node client.js
node test/test-server.js
mocha test/test.js

#test https
cp test/config-sample-https.js config.js
node server.js
node client.js
node test/test-server-https.js
mocha test/test-https.js

```

## license
MIT