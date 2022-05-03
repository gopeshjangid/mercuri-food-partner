require('dotenv').config();

const withImages = require('next-images');

const getEnvVariables = () => {
  const reactKeys = Object.keys(process.env).filter(key => key.includes('REACT_APP_'));
  const processEnv = {};
  reactKeys.forEach(keyName => (processEnv[keyName] = process.env[keyName]));
  return processEnv;
 };

module.exports = withImages({
    webpack(config, options) {
      return config
    },
    env: getEnvVariables()
});
