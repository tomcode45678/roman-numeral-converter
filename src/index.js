#! /usr/bin/env node

import settings from './settings';

const CONVERT = process.argv.slice(2)[0];
const MAX_VALUE = 3999;

const output = [];

export default class RomanNumeralGenerator {
  static generate(number) {
    const stringToConvert = number;

    number = Number(number);

    if (number < 1 || number > MAX_VALUE) {
      throw new Error(`Out of range, use a number between 1 and ${MAX_VALUE}`);
    }

    const digits = stringToConvert.split('').reverse().map(number => Number(number));

    for (let i = 0; i < digits.length; i++) {
      RomanNumeralGenerator.convert(digits[i], settings[i]);
    }
    return output.join('');
  }

  static convert(integer, settings) {
    if (!integer) {
      return;
    }

    let setSymbol = '', startSymbol = '', endSymbol = '', generate = true, rules = {};

    for (let i = 0; i < settings.rules.length; i++) {
      rules = settings.rules[i];
      startSymbol = rules.startSymbol;
      endSymbol = rules.endSymbol;
      setSymbol = rules.setSymbol;

      if (integer === rules.value) {
        generate = false;
        break;
      }
      else if (integer < settings.rules[i + 1].value) {
        break;
      }
    }

    if (generate) {
      const symbols = RomanNumeralGenerator.addDefaultSymbols(integer, settings, setSymbol);
      startSymbol = symbols.startSymbol;
      endSymbol = symbols.endSymbol;
      setSymbol = symbols.setSymbol;
    }
    output.unshift(startSymbol + setSymbol + endSymbol);
  }

  static addDefaultSymbols(integer, settings, setSymbol) {
    let startSymbol = '', endSymbol = '';
    for (let i = 0; i < integer; i++) {
      if (i < settings.defaults.lessThan) {
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
