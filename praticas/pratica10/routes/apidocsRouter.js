const express = require("express");
const fs = require("fs");
const YAML = require("yaml");
const swaggerUI = require("swagger-ui-express");

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

const router = express.Router();

router.use("/", swaggerUI.serve);
router.get("/", swaggerUI.setup(swaggerDocument));

module.exports = router;
