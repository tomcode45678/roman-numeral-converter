#! /usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CONVERT = process.argv.slice(2)[0];
var MAX_VALUE = 3999;

var output = [];

var RomanNumeralGenerator = function () {
  function RomanNumeralGenerator() {
    _classCallCheck(this, RomanNumeralGenerator);
  }

  _createClass(RomanNumeralGenerator, null, [{
    key: 'generate',

    /**
     * Generate Roman Numerals
     * @param digits
     * @returns {string}
     */
    value: function generate(digits) {
      RomanNumeralGenerator.validNumber(digits);

      // Reverse to align digit with correct config segment
      digits = digits.split('').reverse().join('');

      for (var i = 0, digitsLength = digits.length; i < digitsLength; i++) {
        // Convert digit using its config rules
        var digit = Number(digits[i]);
        var digitSymbols = RomanNumeralGenerator.convert(digit, _config2.default[i]);
        output.unshift(digitSymbols);
      }
      return output.join('');
    }

    /**
     * Check if number is valid
     * @param digits
     */

  }, {
    key: 'validNumber',
    value: function validNumber(digits) {
      digits = Number(digits);

      if (digits < 1 || digits > MAX_VALUE) {
        throw new Error('Out of range, use a number between 1 and ' + MAX_VALUE);
      }
    }

    /**
     * Generate digit to symbol set
     * @param integer
     * @param settings
     */

  }, {
    key: 'convert',
    value: function convert(integer, settings) {
      if (!integer) {
        return;
      }

      var generate = true;
      var symbols = {};

      for (var i = 0, settingsRules = settings.rules.length; i < settingsRules; i++) {
        var rule = settings.rules[i];
        symbols = rule;

        if (integer === rule.value) {
          generate = false;
          break;
        } else if (integer < settings.rules[i + 1].value) {
          break;
        }
      }

      if (generate) {
        symbols = RomanNumeralGenerator.addDefaultSymbols(integer, settings, symbols.setSymbol);
      }
      return symbols.startSymbol + symbols.setSymbol + symbols.endSymbol;
    }

    /**
     * Generate default number symbols
     * @param integer
     * @param settings
     * @param setSymbol
     * @returns {{startSymbol: string, setSymbol: string, endSymbol: string}}
     */

  }, {
    key: 'addDefaultSymbols',
    value: function addDefaultSymbols(integer, settings, setSymbol) {
      var startSymbol = '',
          endSymbol = '';
      for (var i = 0; i < integer; i++) {
        if (i < settings.defaults.lessThan && integer < 5) {
          startSymbol += settings.defaults.value;
          setSymbol = '';
        }

        if (i >= 5) {
          startSymbol = '';
          endSymbol += settings.defaults.value;
        }
      }
      return { startSymbol: startSymbol, setSymbol: setSymbol, endSymbol: endSymbol };
    }
  }]);

  return RomanNumeralGenerator;
}();

exports.default = RomanNumeralGenerator;


try {
  console.log(RomanNumeralGenerator.generate(CONVERT));
} catch (error) {
  console.error(error);
}