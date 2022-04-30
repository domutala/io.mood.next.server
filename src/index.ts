import * as data from "./data";
import * as server from "./server";
import * as controllers from "./controllers";

(async () => {
  try {
    if (process.env.NODE_ENV !== "production") {
      if (process.env.PRIVATE_KEY) {
        process.env.PRIVATE_KEY = process.env.PRIVATE_KEY.replace(
          /\\n/gi,
          "\n"
        );
      }
      if (process.env.PUBLIC_KEY) {
        process.env.PUBLIC_KEY = process.env.PUBLIC_KEY.replace(/\\n/gi, "\n");
      }
    }

    await data.init();
    const _server = await server.init();
    await controllers.init(_server.app);
  } catch (error) {
    console.log(error);
  }
})();
