import User from "./models/User.js";
import connect from "./core/db.js";
import { bulkApi } from "./utils/elastic.js";
import { exit } from "process";

connect()
  .then(async () => {
    const dataset = [];
    for await (const user of User.find().batchSize(100)) {
      dataset.push(user);
      if (dataset.length == 100) {
        // bulkWrite to elastic
        await bulkApi("user", dataset);
        dataset.length = 0;
      }
    }
    console.log(dataset)
    if (dataset.length) {
      // bulkWrite to elastic
      await bulkApi("user", dataset);
      dataset.length = 0;
    }
    exit(0);
  })
  .catch((err) => {
    console.log(err);
  });
