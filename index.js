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

const transform = exports.transform = function(tableName, table) {
  const ret = {
    tableName: tableName
  };

  // autoUpdatedAt / autoCreatedAt
  ['updatedAt', 'createdAt'].forEach(k => {
    if (!table[k]) {
      const key = 'auto' + _.upperFirst(k);
      ret[key] = false;
    }
  });

  // attributes
  ret.attributes = {};
  _.each(table, (fieldDef, fieldName) => {
    const key = _.camelCase(fieldName);
    const o = ret.attributes[key] = {};

    // columnName
    if (key !== fieldName) o.columnName = fieldName;

    // type
    o.type = getType(fieldDef.type);

    // primaryKey
    if (fieldDef.primaryKey) o.primaryKey = true;

    // defaults
    if (fieldDef.defaultValue) o.defaultsTo = fieldDef.defaultValue;
  });

  return ret;
};

const getType = t => {
  const _attr = t.toLowerCase();
  let val;

  if (_attr === 'tinyint(1)' || _attr === 'boolean' || _attr === 'bit(1)') {
    val = 'boolean';
  } else if (_attr.match(/^(smallint|mediumint|tinyint|int)/)) {
    val = 'integer';
  } else if (_attr.match(/^bigint/)) {
    val = 'integer';
  } else if (_attr.match(/^string|varchar|varying|nvarchar/)) {
    val = 'STRING';
  } else if (_attr.match(/^char/)) {
    val = 'string';
  } else if (_attr.match(/text|ntext$/)) {
    val = 'text';
  } else if (_attr.match(/^(date)/)) {
    val = 'date';
  } else if (_attr.match(/^(time)/)) {
    val = '<uknown type>';
  } else if (_attr.match(/^(float|float4)/)) {
    val = 'FLOAT';
  } else if (_attr.match(/^decimal/)) {
    val = 'float';
  } else if (_attr.match(/^json/)) {
    val = 'json';
  } else if (_attr.match(/^jsonb/)) {
    val = 'JSONB';
  } else if (_attr.match(/^geometry/)) {
    val = 'GEOMETRY';
  } else {
    val = '<uknown type>';
  }
  return val && val.toLowerCase();
};