#! /usr/bin/env node

import settings from './config';

const CONVERT = process.argv.slice(2)[0];
const MAX_VALUE = 3999;

const output = [];

export default class RomanNumeralGenerator {
  /**
   * Generate Roman Numerals
   * @param digits
   * @returns {string}
   */
  static generate(digits) {
    RomanNumeralGenerator.validNumber(digits);

    // Reverse to align digit with correct config segment
    digits = digits.split('').reverse().join('');

    for (let i = 0, digitsLength = digits.length; i < digitsLength; i++) {
      // Convert digit using its config rules
      const digit = Number(digits[i]);
      const digitSymbols = RomanNumeralGenerator.convert(digit, settings[i]);
      output.unshift(digitSymbols);
    }
    return output.join('');
  }

  /**
   * Check if number is valid
   * @param digits
   */
  static validNumber (digits) {
    digits = Number(digits);

    if (digits < 1 || digits > MAX_VALUE) {
      throw new Error(`Out of range, use a number between 1 and ${MAX_VALUE}`);
    }
  }

  /**
   * Generate digit to symbol set
   * @param integer
   * @param settings
   */
  static convert(integer, settings) {
    if (!integer) {
      return;
    }

    let generate = true;
    let symbols = {};

    for (let i = 0, settingsRules = settings.rules.length; i < settingsRules; i++) {
      const rule = settings.rules[i];
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
  static addDefaultSymbols(integer, settings, setSymbol) {
    let startSymbol = '', endSymbol = '';
    for (let i = 0; i < integer; i++) {
      if (i < settings.defaults.lessThan && integer < 5) {
        startSymbol += settings.defaults.value;
        setSymbol = '';
      }

      if (i >= 5) {
        startSymbol = '';
        endSymbol += settings.defaults.value;
      }
    }
    return { startSymbol, setSymbol, endSymbol };
  }
}

try {
  console.log(RomanNumeralGenerator.generate(CONVERT));
}
catch (error) {
  console.error(error);
}
