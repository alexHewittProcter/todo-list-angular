var process = require('process');
var BACKEND_URL = process.env.NODE_ENV == 'docker_dev' ? 'api' : 'localhost';
const PROXY_CONFIG = [
  {
    context: ['/api/**'],
    target: `http://${BACKEND_URL}:3000`,
  },
];
module.exports = PROXY_CONFIG;
