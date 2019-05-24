const tools = require('./tools/tools.js');
export default class ueasy {
  constructor(appkey = '', appsecret = '') {
    this.tools = new tools();
    this.appkey = appkey;
    this.appsecret = appsecret;
    this.apiUrl = 'https://grootapi.zuoyanit.com';
    this.apiSocketUrl = this.apiUrl + '/socket/push';
  }
  /**
   * 推送消息
   *
   * @memberof ueasy
   */
  async push(appkey = '', appsecret = '', msg = {}) {

  }
  /**
   * 推送消息
   *
   * @memberof ueasy
   */
  async token(appkey = '', appsecret = '', iv = '', msg = {}) => {

  }


};