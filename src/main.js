// const app = require("./app");
// const { APP_PORT } = require("./config/config.default");

// app.listen(APP_PORT, () => {
//   console.log(`server is runnint on http://localhost:${APP_PORT}`);
// });
const app = require("./app");
const { APP_PORT, ENV } = require("./config/config.default");
const https = require("https");
const fs = require("fs");
const path = require("path");

if (ENV === "production" && APP_PORT === "443") {
  const options = {
    key: fs.readFileSync(path.join(__dirname, "./ssl/www.flowin3.com.key")),
    cert: fs.readFileSync(path.join(__dirname, "./ssl/www.flowin3.com.pem")),
  };
  // var server = http.createServer(app.callback());
  var httpsServer = https.createServer(options, app.callback());

  httpsServer.listen(APP_PORT, (err) => {
    if (err) {
      console.log("server init error", err);
    } else {
      console.log("server running at port :" + APP_PORT);
    }
  });
} else {
  console.log("dfsfs");
  app.listen(APP_PORT, () => {
    console.log(`server is runnint on http://localhost:${APP_PORT}`);
  });
}
