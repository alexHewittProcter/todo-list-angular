let BACKEND_URL = 'localhost';
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'docker_dev' || process.env.NODE_ENV == 'docker_qa') {
  BACKEND_URL = 'api';
}
const PROXY_CONFIG = [
  {
    context: ['/api/**'],
    target: `http://${BACKEND_URL}:3000`,
  },
];
module.exports = PROXY_CONFIG;
