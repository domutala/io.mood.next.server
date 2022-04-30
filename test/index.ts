import data from "../src/data";
import services from "../src/services";

(async () => {
  try {
    // 626937e1cc77fd8ccc97dfed
    const db = await data.init();

    const user = await data.functions.user.add({
      mail: "ibntalla@gmail.com",
      name: "Mamadou",
    });

    user.super = true;
    await user.save();

    await db.close();
  } catch (error) {
    console.log((error as Error).name);
    console.log(error);
  }
})();
