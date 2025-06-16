const mongoose = require("mongoose");

async function db() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(conn.connection.host);
  } catch (err) {
    console.log(err);
  }
}

db();
