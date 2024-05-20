const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const multer = require('multer');
const path = require('path');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'images'));
  },

  filename: function (req, file, cb) {
    let date = new Date();
    let imageFileName = date.getTime() + '_' + file.originalname;
    req.body.imageFileName = imageFileName;
    cb(null, imageFileName);
  }
});

const upload = multer({ storage: storage }).any();

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(upload);
server.post("/products", (req, res, next) => {
  let date = new Date();
  req.body.createdAt = date.toISOString();

  if (req.body.price) req.body.price = Number(req.body.price);

  let hasErrors = false;  
  let errors = {};

  if (req.body.name.length < 2) {
    hasErrors = true;
    errors.name = "The name's length should be at least 2 characters";
  }

  if (req.body.brand.length < 2) {
    hasErrors = true;
    errors.brand = "The brand's length should be at least 2 characters";
  }

  if (req.body.category.length < 2) {
    hasErrors = true;
    errors.category = "The category's length should be at least 2 characters";
  }

  if (req.body.price <= 0) {
    hasErrors = true;
    errors.price = "The price is not valid";
  }

  if (req.body.description.length < 10) {
    hasErrors = true;
    errors.description = "The description's length should be at least 10 characters";
  }

  if (hasErrors) {
    res.status(400).jsonp(errors);
    return;
  }

  // Continue to JSON Server router
  next();
});

// Use default router
server.use(router);
server.listen(3004, () => {
  console.log('JSON Server is running');
});
