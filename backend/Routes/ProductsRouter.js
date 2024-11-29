const ensurAuthentication = require("../Middlewares/Auth");

const router = require("express").Router();

router.get("/", ensurAuthentication, (req, res) => {
  console.log("----loginuser---", req.user);
  res.status(201).json([
    { name: "laptop", price: 555 },
    { name: "tv", price: 66564 },
  ]);
});

module.exports = router;
