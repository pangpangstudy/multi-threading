// Controllers
const { Worker } = require("worker_threads");
const User = require("./controllers/user");
const { generatePrimes } = require("../lib/prime-generator");
const { setTimeout } = require("timers/promises");
module.exports = (server) => {
  // ------------------------------------------------ //
  // ************ USER ROUTES ************* //
  // ------------------------------------------------ //

  // Log a user in and give them a token
  server.route("post", "/api/login", User.logUserIn);

  // Log a user out
  server.route("delete", "/api/logout", User.logUserOut);

  // Send user info
  server.route("get", "/api/user", User.sendUserInfo);

  // Update a user info
  server.route("put", "/api/user", User.updateUser);

  // ------------------------------------------------ //
  // ************ PRIME NUMBER ROUTES ************* //
  // ------------------------------------------------ //

  server.route("get", "/api/primes", (req, res) => {
    const count = Number(req.params.get("count"));
    let startingNumber = Number(req.params.get("start"));
    if (!count || !startingNumber) {
      return res.json({
        code: 0,
        message: "格式错误",
      });
    }
    const start = performance.now();
    if (startingNumber < BigInt(Number.MAX_SAFE_INTEGER)) {
      startingNumber = Number(startingNumber);
    }
    const worker = new Worker("./lib/calc.js", {
      workerData: {
        count,
        start: startingNumber,
      },
    });
    const id = setTimeout(() => {
      worker.terminate();
      res.status(408).json("请求超时");
    }, 5000);
    // const primes = generatePrimes(count, startingNumber, { format: true });
    worker.on("message", (primes) => {
      clearTimeout(id);
      res.json({
        primes: primes,
        time: ((performance.now() - start) / 1000).toFixed(2),
      });
    });
  });
};
