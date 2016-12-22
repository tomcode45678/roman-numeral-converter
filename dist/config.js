'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global module:true */

var config = [{
  rules: [{
    value: 4,
    startSymbol: 'I',
    setSymbol: 'V',
    endSymbol: ''
  }, {
    value: 5,
    startSymbol: '',
    setSymbol: 'V',
    endSymbol: ''
  }, {
    value: 9,
    startSymbol: 'I',
    setSymbol: 'X',
    endSymbol: ''
  }],
  defaults: {
    value: 'I',
    lessThan: 4
  }
}, {
  rules: [{
    value: 4,
    startSymbol: 'X',
    setSymbol: 'L',
    endSymbol: ''
  }, {
    value: 5,
    startSymbol: '',
    setSymbol: 'L',
    endSymbol: ''
  }, {
    value: 9,
    startSymbol: '',
    setSymbol: 'X',
    endSymbol: 'C'
  }],
  defaults: {
    value: 'X',
    lessThan: 4
  }
}, {
  rules: [{
    value: 4,
    startSymbol: 'C',
    setSymbol: 'D',
    endSymbol: ''
  }, {
    value: 5,
    startSymbol: '',
    setSymbol: 'D',
    endSymbol: ''
  }, {
    value: 9,
    startSymbol: '',
    setSymbol: 'C',
    endSymbol: 'M'
  }],
  defaults: {
    value: 'C',
    lessThan: 4
  }
}, {
  rules: [{
    value: 5,
    startSymbol: '',
    setSymbol: 'V',
    endSymbol: ''
  }, {
    value: 9,
    startSymbol: '',
    setSymbol: 'I',
    endSymbol: 'X'
  }],
  defaults: {
    value: 'M',
    lessThan: 4
  }
}];

exports.default = config;