//code snippet of jwt middleware
// other imports are part of a seperate curd application 
//ErrorHandler class is a extention of in built Error which is a handler which is then passed to the error middleware for entire application

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const adminController = require("../controller/admin/paramsAdmin");
const verifyInDatabase = adminController.paramsAdminSql;



//verify token middleware
async function verifytoken(req, res, next) {
  try {
    let check = await verifyInDatabase("sasas");
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(req.token, "secretkey", (err, decode) => {
        if (decode.user.username == check[0].admin_name) {
          next;
        } else {
          throw "invalid user";
        }
      });
      next();
    }
  } catch (error) {
    // ideally build a separate middleware for handling middleware errors
    return next(new ErrorHandler(error, 401));
  }
}
module.exports = { verifytoken };
