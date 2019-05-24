const tools = require('./tools/tools.js');
export default class ueasy {
  constructor(socketkey = '', socketsecret = '', api = 'https://grootapi.zuoyanit.com') {
    this.tools = new tools();
    this.socketkey = socketkey;
    this.socketsecret = socketsecret;
    this.apiUrl = api.replace('.com/', '.com');
    this.apiSocketUrl = this.apiUrl + '/socket/push';
  }
  /**
   * 推送消息
   * @param {*} msg 
   */
  async push(msg = {}) {
    const data = {
      socketkey: this.socketkey
      timestamp: this.tools.getUnixTime(),
      msg: JSON.stringify(msg),
    };
    const sign = this.tools.getApiSign(data, this.socketsecret);
    data.sign = sign;
    const doc = await this.tools.httpAgent(this.apiSocketUrl, 'post', data);
    return doc;
  }
  /**
   * 获取加密的token
   */
  getToken() {
    const time = new Date().getTime().toString();
    retutn this.tools.aesEncry(time, this.socketsecret, this.socketsecret);
  }


};