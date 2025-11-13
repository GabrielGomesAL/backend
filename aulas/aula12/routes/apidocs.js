const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const fs = require('fs');

const file = fs.readFileSync('./swagger.yaml');
const swwaggerDoc = yaml.parse(file)

const router = express.Router();

router.use('/', swaggerUi.serve);

router.get('/', swaggerUi.setup(swwaggerDoc));

module.exports = router;
