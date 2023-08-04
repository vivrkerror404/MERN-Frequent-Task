const mongoose = require("mongoose");
//url will be stored in env var(prod) or dotenv file(dev)
const url =
  "mongodb+srv://admin:zPJCRAXPukj77a7z@cluster0.jsbedol.mongodb.net/MERNFrequent?retryWrites=true&w=majority";
function connectToDB(){
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB Conencted"))
    .catch((err) => console.log(err));
};
module.exports = {connectToDB}
