const tools = require('./tools/tools.js');
export default class deasy {
  constructor(appkey = '', appsecret = '', api = 'https://grootapi.zuoyanit.com') {
    this.tools = new tools();
    this.appkey = appkey;
    this.appsecret = appsecret;
    this.apiUrl = api.replace('.com/', '.com');
  }



};