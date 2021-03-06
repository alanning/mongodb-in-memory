'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDb = exports.Db = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var createDb = exports.createDb = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var db;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            db = new Db('db', {});

            db.collections = _bluebird2.default.promisify(db.collections);
            db.dropDatabase = _bluebird2.default.promisify(db.dropDatabase);
            _context3.next = 5;
            return db.dropDatabase();

          case 5:
            return _context3.abrupt('return', db);

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function createDb() {
    return _ref3.apply(this, arguments);
  };
}();

var _tingodb = require('@sanjo/tingodb');

var _tingodb2 = _interopRequireDefault(_tingodb);

var _tcoll = require('@sanjo/tingodb/lib/tcoll');

var _tcoll2 = _interopRequireDefault(_tcoll);

var _tcursor = require('@sanjo/tingodb/lib/tcursor');

var _tcursor2 = _interopRequireDefault(_tcursor);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

['initM', 'initFS', 'compactCollection', 'drop', 'rename', 'createIndex', 'indexExists', 'indexes', 'insert', 'count', 'stats', 'findOne', 'update', 'findAndModify', '_findAndModify200', '_findAndModify140', 'save', 'remove', 'findAndRemove', 'mapReduce', 'group'].forEach(function (methodName) {
  if (_tcoll2.default.prototype[methodName]) {
    _tcoll2.default.prototype[methodName] = _bluebird2.default.promisify(_tcoll2.default.prototype[methodName]);
  }
});

var insert = _tcoll2.default.prototype.insert;

_tcoll2.default.prototype.insertOne = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(doc, options) {
    var document;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return insert.call(this, doc, options);

          case 2:
            document = _context.sent[0];
            return _context.abrupt('return', {
              insertedId: document._id
            });

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

_tcoll2.default.prototype.insert = _tcoll2.default.prototype.insertMany = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(docs, options) {
    var documents;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return insert.call(this, docs, options);

          case 2:
            documents = _context2.sent;
            return _context2.abrupt('return', {
              insertedIds: documents.map(function (document) {
                return document._id;
              })
            });

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

_tcoll2.default.prototype.updateOne = _tcoll2.default.prototype.update;
_tcoll2.default.prototype.updateMany = _tcoll2.default.prototype.update;

_tcoll2.default.prototype.deleteOne = function (filter) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  options = (0, _assign2.default)({}, options, { single: true });
  return _tcoll2.default.prototype.remove.call(this, filter, options);
};
_tcoll2.default.prototype.deleteMany = _tcoll2.default.prototype.remove;['nextObject', 'count', 'close', 'toArray'].forEach(function (methodName) {
  _tcursor2.default.prototype[methodName] = _bluebird2.default.promisify(_tcursor2.default.prototype[methodName]);
});

var inMemory = (0, _tingodb2.default)({ apiLevel: 200, memStore: true, searchInArray: true });
var Db = exports.Db = inMemory.Db;