const { validateEmployee } = require("../validators/validators");
const { pool } = require("../utils");

/***
 * Get all Employees
 * @param req
 * @param res
 */
exports.getAllEmployees = async (req, res) => {
  try {
    let { limit, page } = req.query;

    if (!page || page < 1) page = 1;

    if (!limit) limit = 10;

    //paginate employees table and return the data
    const client = await pool.connect();
    const offset = (page - 1) * limit;
    const result = await client.query(
      "SELECT * FROM employees LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    //return data

    return res.status(200).json({ data: result.rows, message: "OK" });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

/***
 *  Create's a new Employee
 * @param req
 * @param res
 */
exports.createEmployee = async (req, res) => {
  try {
    const { error } = validateEmployee(req.body);
    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });
    const {
      firstname,
      lastname,
      national_id,
      phone,
      email,
      department,
      position,
      manufacturer,
      model,
      serialNumber,
    } = req.body;
    console.log("reached herer .....", req.body);
    //create employee
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM employees WHERE email = $1",
      [req.body.email]
    );
    const dupplicate = result.rows.length > 0;
    if (dupplicate)
      return res.status(400).send({
        message: "Employee already exists",
      });
    console.log("reached here ");
    const newEmployee = await client.query(
      "INSERT INTO employees (firstname, lastname, national_id, phone, email, department, position, manufacturer, model, serialNumber) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        firstname,
        lastname,
        national_id,
        phone,
        email,
        department,
        position,
        manufacturer,
        model,
        serialNumber,
      ]
    );
    return res.status(201).json({
      message: "CREATED",
      data: newEmployee.rows[0],
    });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

/***
 *  updates's a new Employee
 * @param req
 * @param res
 */
exports.updateEmployee = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      national_id,
      phone,
      email,
      department,
      position,
      manufacturer,
      model,
      serialNumber,
    } = req.body;

    const { error } = validateEmployee(req.body);
    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });
    //query to update employee
    const client = await pool.connect();
    const result = await client.query(
      "UPDATE employees SET firstname = $1, lastname = $2, national_id = $3, phone = $4, email = $5, department = $6, position = $7, manufacturer = $8, model = $9, serialNumber = $10 WHERE id = $11 RETURNING *",
      [
        firstname,
        lastname,
        national_id,
        phone,
        email,
        department,
        position,
        manufacturer,
        model,
        serialNumber,
        req.params.id,
      ]
    );

    if (!result)
      return res.status(404).send({
        message: "Employee Not found",
      });

    return res.status(200).send({
      message: "UPDATED",
      data: result,
    });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

/***
 *  updates's a new Employee
 * @param req
 * @param res
 */
exports.deleteEmployee = async (req, res) => {
  try {
    const client = await pool.connect();
    //find employee with given id;
    const employee = await client.query(
      "SELECT * FROM employees WHERE id = $1",
      [req.params.id]
    );
    if (employee.rows.leng < 1)
      return res.status(404).send({ message: "Employee not found" });
    //query to delete employee
    const result = await client.query("DELETE FROM employees WHERE id = $1", [
      req.params.id,
    ]);

    return res.json({
      message: "DELETED",
      success: true,
    });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};
