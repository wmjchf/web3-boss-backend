// const app = require("./app");
// const { APP_PORT } = require("./config/config.default");

// app.listen(APP_PORT, () => {
//   console.log(`server is runnint on http://localhost:${APP_PORT}`);
// });
const app = require("./app");
const { APP_PORT } = require("./config/config.default");

// app.listen(APP_PORT, () => {
//   console.log(`server is runnint on http://localhost:${APP_PORT}`);
// });
// const https = require("https");
const http2 = require("http2");

const fs = require("fs");
const path = require("path");
/**
 * Create HTTP server.
 */
// SSL options
const options = {
  key: fs.readFileSync(path.join(__dirname, "./ssl/www.flowin3.com.key")),
  cert: fs.readFileSync(path.join(__dirname, "./ssl/www.flowin3.com.pem")),
};
// var server = http.createServer(app.callback());
var httpsServer = http2.createSecureServer(options, app.callback());

httpsServer.listen(APP_PORT, (err) => {
  if (err) {
    console.log("server init error", err);
  } else {
    console.log("server running at port :" + APP_PORT);
  }
});

// httpsServer.on("listening", onListening);
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  // var addr = server.address();
  var addr = httpsServer.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
