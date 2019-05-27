const tools = require('../tools/tools');
const assert = require('assert');


describe('socket', () => {
  describe('aes', () => {
    it('aes加密', () => {
      const toolsIns = new tools();
      const time = '1558924053';
      const aesKey = 'AkiFuqSfKvYaTRm8';
      assert.equal('5mhhpss4jeb02tKGbqjV4A==', toolsIns.aesEncry(time, aesKey, aesKey));
    });
    it('aes解密', () => {
      const toolsIns = new tools();
      const data = '5mhhpss4jeb02tKGbqjV4A==';
      const aesKey = 'AkiFuqSfKvYaTRm8';
      assert.equal('1558924053', toolsIns.aesDecry(data, aesKey, aesKey));
    });
  })
});