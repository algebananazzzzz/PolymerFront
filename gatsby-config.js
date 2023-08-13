/**
 * @type {import('gatsby').GatsbyConfig}
 */
const yaml = require('js-yaml');
const fs = require('fs');
const stage = process.env.STAGE ? process.env.STAGE : 'dev'
// Load environment variables from YAML file
const yamlConfig = yaml.load(
  fs.readFileSync(`./.polymer/.config/${stage}.env.yml`, 'utf-8')
);
// Load environment variables from dotenv, which takes precedence
const gatsbyConfig = yaml.load(
  fs.readFileSync(`.polymer/.gatsbyconfig/${process.env.NODE_ENV}.env.yml`, 'utf-8')
);

var target_bucket = null;
let application_name;

function configureEnv(config) {
  Object.entries(config).forEach(([key, value]) => {
    if (key === 'application_name') {
      application_name = value
      process.env.GATSBY_APPLICATION_NAME = value
    } else if (key === 'cognito') {
      Object.entries(value).forEach(([key, value]) => {
        process.env[`GATSBY_COGNITO_${key.toUpperCase()}`] = value
      })
    } else if (key === 'deployment') {
      target_bucket = value.target_bucket
    } else if (key === 'apollo_client') {
      process.env.GATSBY_APOLLO_URI = value.uri
    }
    else {
      process.env[key] = value;
    }
  });
}

if (yamlConfig) {
  configureEnv(yamlConfig)
}

// Override environment variables from gatsby_config, which takes precedence
if (gatsbyConfig) {
  configureEnv(gatsbyConfig)
}

const configuration = {
  siteMetadata: {
    title: `${application_name}`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-apollo',
    }
  ]
}

if (target_bucket) {
  configuration.plugins.push({
    resolve: `gatsby-plugin-s3`,
    options: {
      bucketName: target_bucket,
      acl: null
    },
  })
}

module.exports = configuration