# waterline-auto
> Automatically generate bare Waterline models from your database.

<!--
[![Build Status](https://img.shields.io/travis/magicdawn/waterline-auto.svg?style=flat-square)](https://travis-ci.org/magicdawn/waterline-auto)
[![Coverage Status](https://img.shields.io/coveralls/magicdawn/waterline-auto.svg?style=flat-square)](https://coveralls.io/github/magicdawn/waterline-auto?branch=master)
-->
[![npm version](https://img.shields.io/npm/v/waterline-auto.svg?style=flat-square)](https://www.npmjs.com/package/waterline-auto)
[![npm downloads](https://img.shields.io/npm/dm/waterline-auto.svg?style=flat-square)](https://www.npmjs.com/package/waterline-auto)
[![npm license](https://img.shields.io/npm/l/waterline-auto.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Install
```
npm i waterline-auto -g
```

## Usage
type `wa` | `waterline-auto`

```shell
$ wa

    waterline-auto@0.1.0 - auto generate model from your db

    Options
      -h, --host              host
      -p, --port              port
      -u, --user              username
      -a, --password          password
      -d, --database          database
      -t, --table, --tables   table names
      -r, --raw-type          add `rawType` in output, default true
      -c, --comment           add `comment` in output, default true
      --sequelize-log         sequelize `logging`, default true
      --help                  show this help message
```

### Notes
- `-a` take from `redis-cli`, `authentication`

## Changelog
[CHANGELOG.md](CHANGELOG.md)

## License
the MIT License http://magicdawn.mit-license.org