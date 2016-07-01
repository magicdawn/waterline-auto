'use strict';

const SequelizeAuto = require('sequelize-auto');
require('promise.ify').all(SequelizeAuto.prototype);
const co = require('co');

const main = co.wrap(function*() {
  const auto = new SequelizeAuto('stock', 'admin', 'nopass.0601', {
    tables: ['TB_TRADE_ACCOUNT'],
    host: '10.255.52.118'
  });

  yield auto.buildAsync();
  console.log(auto.tables);
});

main().catch(console.error);