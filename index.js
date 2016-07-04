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

const transform = exports.transform = function(tableName, table, options) {
  options = options || {};
  const rawType = Boolean(options.rawType);
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
    o.type = getType(fieldDef.type).toLowerCase();
    if (rawType) o.rawType = fieldDef.type;

    // primaryKey
    if (fieldDef.primaryKey) o.primaryKey = true;

    // defaults
    if (fieldDef.defaultValue) o.defaultsTo = fieldDef.defaultValue;
  });

  return ret;
};

// http://sailsjs.org/documentation/concepts/models-and-orm/attributes
const getType = t => {
  t = t.toLowerCase();
  let val;

  // boolean
  if (t === 'tinyint(1)' || t === 'boolean' || t === 'bit(1)') return 'boolean';

  // integer
  if (t.match(/^(smallint|mediumint|tinyint|bigint|int)/)) return 'integer';

  // float
  if (t.match(/^float|decimal/)) return 'float';

  // string
  if (t.match(/^string|varchar|varying|nvarchar|char/)) return 'string';

  // text
  if (t.match(/^longtext/)) return 'longtext';
  if (t.match(/^mediumtext/)) return 'mediumtext';
  if (t.match(/text$/)) return 'text';

  // date & time
  if (t === 'datetime') return 'datetime';
  if (t.match(/^date/)) return 'date';
  if (t.match(/^time/)) return '<unsupported type>';

  // json
  if (t.match(/^json/)) return 'json';

  return '<uknown type>';
};