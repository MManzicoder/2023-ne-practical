const { compare } = require("bcryptjs");
const { validateUser, validateUserLogin } = require("../validators/validators");
const { hashPassword } = require("../utils/imports");
const { pool } = require("../utils");
const { generateAuthToken } = require("../utils/tokenifier");

/***
 *  Create's a new user
 * @param req
 * @param res
 */
exports.createUser = async (req, res) => {
  try {
    const client = await pool.connect();
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });

    const result = await client.query(
      "SELECT * FROM users WHERE username = $1",
      [req.body.username]
    );
    if (result.rows.length > 0) {
      return res.status(400).send({
        message: "User already exists",
      });
    }

    req.body.password = await hashPassword(req.body.password);

    //create new user postgres

    const newUser = await client.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [req.body.username, req.body.password]
    );
    if (!newUser) {
      return res.status(500).send({
        message: "Error creating user",
      });
    }

    return res.status(201).send({
      message: "CREATED",
      data: newUser.rows[0],
    });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

/***
 *  Create's a new user
 * @param req
 * @param res
 */
exports.getCurrentUser = async (req, res) => {
  try {
    //find the current user postgres
    const client = await pool.connect();
    const currentUser = await client.query(
      "SELECT * FROM users where id = $1",
      [req.user.id]
    );

    return res.status(201).send({
      message: "OK",
      data: currentUser.rows[0],
    });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

/**
 * Login User
 * @param req
 * @param res
 */
exports.userLogin = async (req, res) => {
  try {
    const { error } = validateUserLogin(req.body);
    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });

    //login user with postgres
    const client = await pool.connect();
    const user = await client.query("SELECT * FROM users WHERE username = $1", [
      req.body.username,
    ]);
    if (user.rows.length < 1) {
      return res.status(404).send({
        message: "Invalid credentials",
      });
    }

    const validPassword = await compare(
      req.body.password,
      user.rows[0].password
    );
    if (!validPassword)
      return res.status(404).send({
        message: "Invalid credentials",
      });
    return res.status(200).send({
      message: "OK",
      token: await generateAuthToken({ id: user.rows[0].id }),
    });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};
