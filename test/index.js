const tools = require('../tools/tools');
const assert = require('assert');


describe('api请求', () => {
  describe('签名', () => {
    it('对象', () => {
      const toolsIns = new tools();
      const data = {
        name: '',
        timestamp: 1558931484,
        cp: 1,
        mp: 20,
        userkey: 'd445378c40e34d43a5ce230aa189db53',
      };
      const secret = 'c3a8f06a271348c19213e9605dad4e6c';
      assert.equal('i1IR%2BN9oROkc51Sq1PlzphScRsk%3D', toolsIns.getApiSign(data, secret));
    });
    it('字符串', () => {
      const toolsIns = new tools();
      const data = 'name=&timestamp=1558931484&cp=1&mp=20&userkey=d445378c40e34d43a5ce230aa189db53';
      const secret = 'c3a8f06a271348c19213e9605dad4e6c';
      assert.equal('i1IR%2BN9oROkc51Sq1PlzphScRsk%3D', toolsIns.getApiSign(data, secret));
    });
  })
});