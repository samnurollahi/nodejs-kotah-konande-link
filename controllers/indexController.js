const ShortUniqueId = require("short-unique-id");

const ShortURL = require("../models/shortLink");

const uuid = new ShortUniqueId({ length: 7 });

exports.index = (req, res) => {
  res.render("index", {
    pageTitle: "ساخت لینک کوچک",
    path: "/",
    errors: []
  });
};

exports.shortURL = async (req, res) => {
  try {
    let id = uuid.rnd();
    const url = await ShortURL.findOne({ url: req.body.url });

    if (url) {
      return res.render("shorturl", {
        pageTitle: "لینک شما ساخته شد",
        shortUrl: `127.0.0.1:3000/u/${url.shortUrl}`,
      });
    } else {
      await ShortURL.yup(req.body)
      await ShortURL.create({
        url: req.body.url,
        shortUrl: id,
      });

      return res.render("shorturl", {
        pageTitle: "لینک شما ساخته شد",
        shortUrl: `127.0.0.1:3000/u/${id}`,
      });
    }
  } catch (err) {
    const errorArr = []
    err.errors.forEach(e => {
      errorArr.push(e)
    })
    console.log(errorArr)
    res.render("index", {
      pageTitle: "ساخت لینک کوچک",
      path: "/",
      errors: errorArr
    });
  }
};

exports.sender = async (req, res) => {
  const url = await ShortURL.findOne({ shortUrl: req.params.id });
  if (url) res.redirect(url.url);
  else res.redirect("/");
};
