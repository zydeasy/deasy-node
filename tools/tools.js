/**
 * @Author: 左盐 <zuoyan>
 * @Date:   2017-12-03 16:44:45
 * @Email:  huabinglan@163.com
 * @Project: xxxx
 * @Last modified by:   左盐
 * @Last modified time: 2018-06-06 22:57:30
 */
const xssFilter = require('xss'); // xss
const hmacsha1 = require('hmacsha1'); // 加密
const CryptoJS = require('crypto-js');
const superagent = require('superagent'); // 爬虫

module.exports = class tools {
  sleep(ms) { // 等待一段时间
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  /**
   * http请求
   * @method httpAgent
   * @param  {[type]}  url    [description]
   * @param  {[type]}  method [description]
   * @param  {[type]}  data   [description]
   * @return {[type]}         [description]
   */
  httpAgent(url, method = 'get', data = '') {
    method = method.toLowerCase();
    if (method === 'get' || method === 'del') {
      return new Promise(function (resolve, reject) {
        superagent[method].call(this, url).query(data).end(function (err, res) {
          if (err || !res.ok) {
            reject(err || res.ok);
          }
          resolve(res.body);
        });
      });
    } else {
      return new Promise(function (resolve, reject) {
        superagent[method].call(this, url).send(data).end(function (err, res) {
          if (err || !res.ok) {
            reject(err || res.ok);
          }
          resolve(res.body);
        });
      });
    }
  };
  /**
   * xss过滤
   * @method xssFomat
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  xss(str) {
    if (typeof (str) === 'object') { // 处理json
      const json = {};
      for (var key in str) {
        if (typeof (str[key]) === 'string') {
          json[key] = xssFilter(str[key]);
        } else {
          json[key] = str[key];
        }
      }
      return json;
    } else {
      return xssFilter(str);
    }
  };

  /**
   * 生成随机字符串
   * @method randomChar
   * @return {[type]}   [description]
   */
  randomChar(len, charType) {
    const en = '0123456789qwertyioplkjhgfsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM';
    const special = '~!@#$%^&*()_+{}[]:<>,.?';
    let x = en;
    if (charType) {
      x = en + special;
    }
    let tmp = '';
    for (var i = 0; i < len; i++) {
      tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
    }
    return tmp;
  };
  /**
   * 获取unix时间
   * @method
   * @return {[type]} [description]
   */
  getUnixTime() {
    return Math.round(new Date().getTime() / 1000);
  };
  // Api签名
  getApiSign(data, key = 'kG8by9pl^d') {
    let paramsJson = {};
    if (typeof (data) === 'string') {
      data = data.split('&');
      for (let i = 0, len = data.length; i < len; i++) {
        const a = data[i].split('=');
        paramsJson[a[0]] = a[1];
      }
    } else {
      paramsJson = data;
    }
    const keys = [];
    for (const key in paramsJson) {
      keys.push(key);
    }
    keys.sort();

    let paramStr = [];
    for (let i = 0, len = keys.length; i < len; i++) {
      paramStr.push(keys[i] + '=' + paramsJson[keys[i]]);
    }
    paramStr = encodeURIComponent(paramStr.join('&'));
    // paramStr = paramStr.replace(/%253A/g, '%3A');
    // paramStr = paramStr.replace(/%257C/g, '%7C');
    // paramStr = paramStr.replace(/%2520/g, '%20');
    // paramStr = paramStr.replace(/%2526/g, '%26');
    // paramStr = paramStr.replace(/%253D/g, '%3D');
    // paramStr = paramStr.replace(/%252F/g, '%2F');
    // paramStr = paramStr.replace(/%25/g, '%');
    let sign = hmacsha1(key, paramStr);
    sign = encodeURIComponent(sign);
    return sign;
  };

  /**
   *  AES加密
   * @param {*} data
   * @param {*} key
   * @param {*} iv
   */
  aesEncry(data, key, iv = '') {
    const result = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return result.toString();
  };
  /**
   * AES解密
   */
  aesDecry(data, key, iv = '') {
    if (!data) {
      return '';
    }
    const result = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return result.toString(CryptoJS.enc.Utf8);
  };
}