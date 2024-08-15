const { workerData, parentPort } = require("worker_threads");
const generatePrimes = require("./prime-generator");
const primes = generatePrimes(workerData.count, workerData.start);
parentPort.postMessage(primes);
