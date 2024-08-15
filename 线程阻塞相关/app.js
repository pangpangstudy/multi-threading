const { Worker } = require("worker_threads");
const fs = require("fs");
// 此时线程独立执行 并不会因为主线程的阻塞而无法执行  但是应尽可能保持主线程的free
new Worker("./calc.js");
// setTimeout(() => {
//   fs.writeFile("./text.txt", "this is some text", (err) => {
//     if (err) return console.log(err);
//     console.log("created");
//   });
// }, 3000);
while (true) {}
