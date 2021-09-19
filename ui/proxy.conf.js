let BACKEND_URL = 'localhost';
if (process.env.NODE_ENV == 'docker_dev' || process.env.NODE_ENV == 'docker_qa') {
  BACKEND_URL = 'api';
}

if (process.env.PI_PROXY == 'true') {
  BACKEND_URL = 'pi';
}

const PROXY_CONFIG = [
  {
    context: ['/api/**'],
    target: `http://${BACKEND_URL}:3000`,
  },
];
module.exports = PROXY_CONFIG;
