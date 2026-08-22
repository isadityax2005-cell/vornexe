const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("jsdomError", (err) => {
  console.log("JSDOM Error:", err.stack || err);
});
virtualConsole.on("error", (...args) => {
  console.log("Console Error:", ...args);
});

JSDOM.fromURL("https://vornexe.vercel.app/", {
  runScripts: "dangerously",
  resources: "usable",
  virtualConsole
}).then(dom => {
  setTimeout(() => {
    console.log("Done waiting.");
  }, 3000);
});
