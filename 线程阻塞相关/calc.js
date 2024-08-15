setTimeout(() => {
  fs.writeFile("./text.txt", "this is some text", (err) => {
    if (err) return console.log(err);
    console.log("created");
  });
}, 3000);
