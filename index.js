const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const PORT = 5000;
app.get("/", (req, res) => {
  res.json("working");
});
app.post("/apijwt", verifytoken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "verify working",
        authData,
      });
    }
  });
  // res.json(" jwt working");
});
app.post("/login", (req, res) => {
  let user = {
    id: 1,
    username: "abd",
    email: "abd@gmail.com",
  };
  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({ token });
  });
});
//verify token middleware
function verifytoken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
app.listen(PORT, () => {
  console.log("server listening at :", PORT);
});
