## deasy server sdk
deasy服务器端sdk

### 安装
```js
npm i deasy
```
### socket
* 获取客户端鉴权token
  
  ```js
  const deasySocket = require('deasy/socket');
  const socket = new deasySocket(appkey, appsecret);
  const token = socket.getToken();
  ```

* api推送信息
  
  ```js
  const deasySocket = require('deasy/socket');
  const socket = new deasySocket(appkey, appsecret);
  const result = await socket.push({
    xxxxxx
  });
  ```

  ###短信

  ```js
  const SMS = require('deasy/sms');
  const sms = new SMS(appkey, appsecret);
  const result = await sms.send(phone, msg,signname);
  ```




