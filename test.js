'use strict';

var IpUtil = require('./index.js');
var isIp = IpUtil.isIP;

describe('ipUtil utils method', function () {
  it('#isIp()', function() {
    isIp('1.1').should.be.false;
    isIp('').should.be.false;
    isIp().should.be.false;
    isIp('300.255.255.255').should.be.false;
    isIp('0.0.0').should.be.false;

    isIp('0.0.0.0').should.be.true;
    isIp('255.255.255.255').should.be.true;
  });
  it('#ipToLong()', function () {
    var l = IpUtil.ip2Long('61.172.201.235');
    (l).should.be.type('number');
    (l).should.be.eql(1034734059);
    var l2 = IpUtil.ip2Long('173.194.127.243');
    (l2).should.be.eql(2915205107);

    var l3 = IpUtil.ip2Long('224.224.224.224');
    (l3).should.be.eql(3772834016);
  });

  it('#longToIp()', function () {
    var ip = IpUtil.long2Ip(1034734059);
    (ip).should.be.type('string');
    (ip).should.be.eql('61.172.201.235');
  });
});

describe('find ip info, gbk', function() {
  var ipUtil;
  before(function() {
    ipUtil = new IpUtil('ip-gbk.txt');
  });

  it('getIPInfo()', function() {
    (ipUtil.getIpInfo('10.1.1.1') === null).should.be.ok;
    (ipUtil.getIpInfo('10.1.') === null).should.be.ok;
    ipUtil.getIpInfo('1.26.6.0').city.should.be.eql('呼伦贝尔');
  });
});

describe('find ip info, utf8', function() {
  var ipUtil;
  before(function() {
    ipUtil = new IpUtil('ip-utf8.txt', 'utf8');
  });

  it('getIPInfo()', function() {
    (ipUtil.getIpInfo('10.1.1.1') === null).should.be.ok;
    (ipUtil.getIpInfo('10.1.') === null).should.be.ok;
    ipUtil.getIpInfo('1.26.6.0').city.should.be.eql('呼伦贝尔');
  });
});
