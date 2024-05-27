// import dependencies
const { verify } = require("jsonwebtoken");
const pool = require("../utils").pool;

async function auth(req, res, next) {
  const header = req.header("authorization");
  console.log("header", header.split(" ")[1]);
  const token = header ? header.split(" ")[1] : req.query.token;
  if (!token) return res.status(401).send({ message: "No Token Found" });
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    //find user with id
    const client = await pool.connect();
    const user = await client.query("SELECT * FROM users WHERE id = $1", [
      decoded.id,
    ]);
    if (user.rows[0].length < 1)
      return res.status(401).send({ message: "Invalid Token" });
    req.user = user.rows[0];
    next();
  } catch (err) {
    res.status(401).send({ message: "Unauthorized acccess" });
  }
}
module.exports.auth = auth;
