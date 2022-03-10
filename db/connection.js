const mongoose = require("mongoose");
const db = mongoose.connect(process.env.DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => console.log("Database connecion established!!!"));
module.exports = db;
