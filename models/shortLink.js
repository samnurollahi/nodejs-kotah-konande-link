const mongoose = require("mongoose");
const yup = require("yup");

const schema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    max: 700,
  },
  shortUrl: {
    type: String,
    default: "127.0.0.1:3000",
    required: true,
  },
});

schema.statics.yup = function (body) {
  return yup
    .object()
    .shape({
      url: yup
        .string()
        .required("شما لینکی وارد نکرده اید")
        .max(100000, "حجم لینک شما خیلی زیاد است"),
    })
    .validate(body, {
      abortEarly: true,
    });
};


module.exports = mongoose.model("ShortUrl", schema)