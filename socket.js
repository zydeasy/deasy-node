const tools = require('./tools/tools.js');
module.exports = class socket {
  constructor(appkey = '', socketsecret = '', api = 'https://grootapi.zuoyanit.com') {
    this.tools = new tools();
    this.appkey = appkey;
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
      appkey: this.appkey,
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
    return this.tools.aesEncry(time, this.socketsecret, this.socketsecret);
  }


};