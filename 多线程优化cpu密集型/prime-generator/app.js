const { Worker, workerData } = require("worker_threads");
// count:80 start:12n ** 17n time:82s threads=1 BigInts
// count:80 start:12n ** 17n time:20s threads=8 BigInts  ?
let result;
let completed = 0;
const THREADS = 2;
const count = 200;
for (let i = 0; i < THREADS; i++) {
  const start = performance.now();
  const worker = new Worker("./calc.js", {
    workerData: {
      count: count / THREADS,
      //   start: 100_000_000_000_000 + i * 300, 30s对于超出 Number 精确范围的大数，JavaScript 引擎需要进行额外的处理和检查。
      start: 100_000_000_000_000n + BigInt(i * 300), //1.5s
    },
  });
  const threadId = worker.threadId;
  console.log(`Worker ${threadId} started.`);
  worker.on("message", (primes) => {
    result = result.concat(primes);
  });
  worker.on("error", (err) => {
    console.log(err);
  });
  worker.on("exit", (code) => {
    console.log(`Worker ${threadId} exited`);
    completed++;
    if (completed === THREADS) {
      console.log(`Time taken: ${performance.now() - start}ms`);
      console.log(result.sort());
    }
    if (code !== 0) {
      console.error(`Worker ${threadId} exited with code ${code}`);
    }
  });
}
