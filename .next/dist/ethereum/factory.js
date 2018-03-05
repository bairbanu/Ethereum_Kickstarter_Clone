'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _CampaignFactory = require('./build/CampaignFactory.json');

var _CampaignFactory2 = _interopRequireDefault(_CampaignFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var address = '0x3f6e048A042C13DF9325f6fc28FE684827f49B4F';
var ABI = JSON.parse(_CampaignFactory2.default.interface);

exports.default = new _web2.default.eth.Contract(ABI, address);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL2ZhY3RvcnkuanMiXSwibmFtZXMiOlsid2ViMyIsIkNhbXBhaWduRmFjdG9yeSIsImFkZHJlc3MiLCJBQkkiLCJKU09OIiwicGFyc2UiLCJpbnRlcmZhY2UiLCJldGgiLCJDb250cmFjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsQUFBTyxBQUFQLEFBQWlCLEFBQWpCOzs7O0FBQ0EsQUFBTyxBQUFQLEFBQTRCLEFBQTVCOzs7Ozs7QUFFQSxJQUFNLFVBQVUsQUFBaEI7QUFDQSxJQUFNLE1BQU0sS0FBSyxBQUFMLE1BQVcsMEJBQWdCLEFBQTNCLEFBQVosQUFFQTs7a0JBQWUsSUFBSSxjQUFLLEFBQUwsSUFBUyxBQUFiLFNBQXNCLEFBQXRCLEtBQTJCLEFBQTNCLEFBQWYiLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvenViYWlybmFobWVkL1Byb2plY3RzL0Jsb2NrY2hhaW4vRXRoZXJldW1fS2lja3N0YXJ0ZXJfQ2xvbmUifQ==