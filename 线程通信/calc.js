import { parentPort, Worker, workerData } from "worker_threads";
// const obj = workerData;
// obj.name = "Dylan";
// console.log(obj);
// --------------------
// const port = workerData.port;
// port.postMessage("some text for testing");
// port.on("message", (msg) => {
//   console.log("Worker received:", msg);
// });
// --------------------
const port = parentPort;
port.postMessage("some text for testing");
port.on("message", (msg) => {
  console.log("Worker received:", msg);
});
