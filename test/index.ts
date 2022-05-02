import { User } from "../src/data/entities/User";
import data from "../src/data";
import services from "../src/services";

(async () => {
  try {
    // 626937e1cc77fd8ccc97dfed
    const db = await data.init();

    // const user = new User();
    // user.data = {
    //   name: "Nexts Africa",
    //   username: "nexts.africa",
    //   mail: "",
    // };

    // user.certificy = true;

    // await user.save();

    const user = await data.functions.user.find_or_faild({
      username: "nexts.africa",
    });

    await db.close();
  } catch (error) {
    console.log((error as Error).name);
    console.log(error);
  }
})();
