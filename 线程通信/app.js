import { Worker } from "worker_threads";
// 1.
/*const obj = { name: "name" };
new Worker("./calc.js", { workerData: obj });
console.log(obj);*/
// 2.
/*
const channel = new MessageChannel();
console.log(channel);
const port1 = channel.port1;
const port2 = channel.port2;

port1.postMessage({ name: "Joe" });
port2.postMessage({ name: "job" });
port1.on("message", (message) => {
  console.log(`Message received on port2: `, message);
});

port2.on("message", (message) => {
  console.log(`Message received on port2: `, message);
});
*/
// 3. 两个worker thread之间通信
/*const { port1, port2 } = new MessageChannel();
const thread1 = new Worker("./calc.js", {
  workerData: { port: port1 },
  transferList: [port1],
});
const thread2 = new Worker("./calc.js", {
  workerData: { port: port2 },
  transferList: [port2],
});
*/
// 4. 主线程 和 两个 worker线程直接通信
/*const channel1 = new MessageChannel();
const channel2 = new MessageChannel();
const thread1 = new Worker("./calc.js", {
  workerData: { port: channel1.port2 },
  transferList: [channel1.port2],
});
const thread2 = new Worker("./calc.js", {
  workerData: { port: channel2.port2 },
  transferList: [channel2.port2],
});
channel1.port1.on("message", (message) => {
  console.log(`Message received on channel1: `, message);
});

channel2.port1.on("message", (message) => {
  console.log(`Message received on channel2: `, message);
});*/
const thread1 = new Worker("./calc.js");
thread1.on("message", (msg) => {
  console.log("msg");
});
thread1.postMessage("message");
