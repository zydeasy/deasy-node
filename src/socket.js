const tools = require('./tools/tools.js');
export default class ueasy {
  socket = {};
  constructor(appkey = '', appsecret = '') {
    this.tools = new tools();
    this.appkey = appkey;
    this.appsecret = appsecret;
    this.apiUrl = 'https://grootapi.zuoyanit.com';
    this.apiSocketUrl = this.apiUrl + '/socket/push';
  }

  async socket(appkey = '', appsecret = '', iv = '', msg = {}) {

  }


};