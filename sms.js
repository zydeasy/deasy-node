const tools = require('./tools/tools.js');
module.exports = class sms {
  constructor(appkey = '', secret = '', api = 'https://grootapi.zuoyanit.com') {
    this.tools = new tools();
    this.appkey = appkey;
    this.secret = secret;
    this.apiUrl = api.replace('.com/', '.com');
  }
  /**
   * 推送消息
   * @param {*} msg 
   */
  async send(phone = '', msg = '', signname = '') {
    const data = {
      appkey: this.appkey,
      timestamp: this.tools.getUnixTime(),
      msg,
      phone,
      signname
    };
    const sign = this.tools.getApiSign(data, this.secret);
    data.sign = sign;
    const doc = await this.tools.httpAgent(this.apiUrl + '/api/sms/send', 'post', data);
    return doc;
  }



};