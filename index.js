#! /usr/bin/env node
'use strict';

var SETTINGS = require('./data/settings');

var CONVERT = process.argv.slice(2)[0];

var numArray = [], output = [];

/**
 * @param integer | string
 * @throw error | string message
 * @return string | string number
 */
var romanNumeralConverter = function (integer, settings) {
    var stringToConvert = integer;

    integer = Number(integer);

    if (!integer || integer < 1 || integer > 9999) {
        throw new Error("Out of range, use a number between 1 and 9999");
    }

    for (var i = 0; i < stringToConvert.length; i++) {
        numArray.push(+stringToConvert.charAt(i));
    }

    numArray.reverse();

    for (var ii = 0; ii < numArray.length; ii++) {
        convert(numArray[ii], settings[ii]);
    }
    return output.reverse().join('');

    function convert(integer, settings) {
        if (!integer) {
            return;
        }

        var setSymbol = '', startSymbol = '', endSymbol = '', generate = true, rules = {};

        for (var i = 0; i < settings.rules.length; i++) {
            rules = settings.rules[i];
            startSymbol = rules.startSymbol;
            endSymbol = rules.endSymbol;
            setSymbol = rules.setSymbol;

            if (integer === rules.value) {
                generate = false;
                break;
            }
            else if (integer < settings.rules[i+1].value) {
                break;
            }
        }

        if (generate) {
            var symbols = addDefaultSymbols(integer, settings, setSymbol);
            startSymbol = symbols.startSymbol;
            endSymbol = symbols.endSymbol;
            setSymbol = symbols.setSymbol;
        }
        output.push(startSymbol + setSymbol + endSymbol);
    }

    function addDefaultSymbols (integer, settings, setSymbol) {
        var startSymbol = '', endSymbol = '', cachedSetSymbol = setSymbol;
        for (var i = 0; i < integer; i++) {
            if (i < settings.defaults.lessThan) {
                startSymbol += settings.defaults.value;
                setSymbol = '';
            }
            if (i >= 5) {
                startSymbol = '';
                endSymbol += settings.defaults.value;
                setSymbol = cachedSetSymbol;
            }
        }
        return {startSymbol: startSymbol, setSymbol: setSymbol, endSymbol: endSymbol};
    }
};

try {
    return console.log(romanNumeralConverter(CONVERT, SETTINGS));
}
catch (error) {
    return console.error("The number entered is not allowed: " + error);
}
