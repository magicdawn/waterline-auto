'use strict';

/**
 * Module dependencies
 */

const SequelizeAuto = require('sequelize-auto');
require('promise.ify').all(SequelizeAuto.prototype);
const co = require('co');
const _ = require('lodash');

/**
 * getTables
 */

const getTables = exports.getTables = co.wrap(function*(options) {
  const host = options.host || 'localhost';
  const port = options.port || '3306';
  const database = options.database;
  const user = options.user;
  const password = options.password;
  const tables = options.tables;

  const auto = new SequelizeAuto(database, user, password, {
    host: host,
    port: port,
    tables: tables
  });

  yield auto.buildAsync();
  return auto.tables;
});

/**
 * transform a table
 */

const transform = function(name, table) {
  const ret = {
    tableName: name,
    attributes: {}
  };

  _.each(table, (v, field) => {
    ret.attributes[field] = {};
    // const

  });
};