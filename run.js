'use strict';

const async = require('async');
const ASQ = require('asynquence');
const ASQ_MAP = require('asynquence-contrib');
const sieve = require('sieve');
const MAX = 100000000;
const ARRAY_SIZE = 20;

// sample array
// sample function
var calculate = function (cb) {
  var primes = sieve(MAX); // calculate all primes from 1 to MAX
  cb();
};
var sampleArray = Array.apply(null, Array(ARRAY_SIZE)).map(calculate);



var useAync = false;

if (process.argv[2] === 'async') {

  //  map async
  var step2= function() {
    var asyncMap = 'async_map';
    console.log(asyncMap, 'start');
    console.time(asyncMap);
    async.each(
      sampleArray,
      function (obj, cb) {
        calculate(cb);
      },
      function (e, o) {
        console.timeEnd(asyncMap);
      });
  };

  // 10 waterfall async
  var asyncWaterfall10 = 'async_waterfall_10';
  console.log(asyncWaterfall10, 'start');
  console.time(asyncWaterfall10);
  async.waterfall(
    sampleArray,
    function (e, o) {
      console.timeEnd(asyncWaterfall10);
      step2();
    });



} else if (process.argv[2] === 'asq') {

  //  map asq
  var step2 = function() {
    var asqMap = 'asq_map';
    console.log(asqMap, 'start');
    console.time(asqMap);
    ASQ_MAP().map(
      sampleArray,
      function (obj, cb) {
        calculate(cb);
      }).then(
      function (cb) {
        console.timeEnd(asqMap);
      });
  };

  // 10 waterfall asq
  var asqWaterfall10 = 'asq_waterfall_10';
  console.log(asqWaterfall10, 'start');
  console.time(asqWaterfall10);
  ASQ(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(calculate)
    .then(function (e, o) {
      console.timeEnd(asqWaterfall10);
      step2();
    });


} else {
  console.log('unrecognized parameter ', process.argv[2]);
}






