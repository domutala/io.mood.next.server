import * as http from "http";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as os from "os";
import * as fileUpload from "express-fileupload";

export const init = async () => {
  // démarer le server
  const app = express();

  // config
  app.use(cors());
  app.use(bodyParser.json({}));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(fileUpload());

  const server = http.createServer(app);

  // listen
  const port = process.env.PORT;
  server.listen(port);

  const networkInterfaces = os.networkInterfaces();
  const pack = require("../package.json");

  // console.clear();
  console.log("\x1b[0m", "");
  log(pack.displayname, `http://localhost:${port}`);

  for (const name in networkInterfaces) {
    if (Object.prototype.hasOwnProperty.call(networkInterfaces, name)) {
      const networkInterface = networkInterfaces[name];

      if (networkInterface) {
        for (const net of networkInterface) {
          if (net.family === "IPv4" && !net.internal) {
            log(pack.displayname, `http://${net.address}:${port}`);
          }
        }
      }
    }
  }

  console.log("\x1b[0m", "");

  return { server, app };
};
function log(displayname: string, url: string) {
  console.log(
    "\x1b[0m",
    "   ",
    "\x1b[33m",
    displayname,
    "\x1b[0m",
    "is running on",
    "\x1b[36m",
    url
  );
}
