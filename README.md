# PolymerFront

PolymerFront is a Framework dedicated to empower FrontEnd development with React using GatsbyJS. It simplifies the provisioning of frontend Serverless AWS resources using Terraform with CI/CD pipelines.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## About

PolymerFront is a member of the Polymer framework family, designed to empower developers in building sophisticated applications. This framework utilizes Terraform for provisioning Serverless resources within the AWS Cloud Infrastructure, while also facilitating the establishment of streamlined CI/CD pipelines through GitHub Actions. For more information about the Polymer framework, please visit the [PolymerBase repository](https://github.com/algebananazzzzz/PolymerBase).


PolymerFront aims to empower frontend development with React. This framework enables developers to bundle React application with GatsbyJS, push content to S3 and subsequently deliver content to consumers via CloudFront. The process is optimized through streamlined CI/CD pipelines, ensuring efficient and reliable deployment.

## Configuration

Please refer to the example configuration file for additional information:
[Example Configuration File](.polymer/.config/example.{stage}.env.yml)


Configuration within PolymerFront consists of two key aspects:

1. Resource Configuration: This involves the setup and customization of the resources that PolymerFront deploys, including CloudFront and S3.

2. Application Configuration: Variables used in your application. Consists of parameters such as Cognito user and identity pool IDs, Apollo Client configuration, and S3 data bucket name



Configuration is stored in YAML files, specific to CI/CD staging environments. General configuration files are located in .polymer/.config and should follow the format {stage}.env.yml (e.g., dev.env.yml for development).

Gatsby configuration files are found in .polymer/.gatsbyconfig folder, used to configure environment variables during bundling (gatsby build) or local development (gatsby develop). It should follow the format {stage}.env.yml (e.g., development.env.yml for development). An example usage: GATSBY_APOLLO_URI = http://localhost:4000

## Integrations

1. PolymerFront utilises the **GatsbyJS framework** to bundle **React** applications into static files for production. Learn more about [GatsbyJS](https://www.gatsbyjs.com). 

2. It integrates with the **[Amplify](https://docs.amplify.aws/lib/q/platform/js/) Auth and Content** package, allowing for smooth interaction with Cognito identity and user pools. This integration also enables the utilization of S3 buckets for the storage of user data and other essential resources. 


To configure cognito user and identity pool, as well as data buckets, follow this syntax:
```yaml
cognito:
  region: ap-southeast-1
  userpoolid: ap-southeast-1_abc123
  webclientid: 1234556dasdsadsad
  identitypoolid: ap-southeast-1:1234-1234-1244-3213 # optional, if identity pool not required
storage:
  name: polymer-bucket-data
  region: ap-southeast-1
```


3. PolymerFront also integrates with **ApolloClient** using the [gatsby-plugin-apollo](https://www.gatsbyjs.com/plugins/gatsby-plugin-apollo) plugin, providing a robust platform for efficient communication with GraphQL APIs and streamlined data management.

To configure the source URI for Apollo Client:
```yaml
apollo_client:
  uri: https://123abc.execute-api.ap-southeast-1.amazonaws.com/dev/api
```

## Resources

Here are the resources that PolymerFront will deploy, along with instructions on how to configure them:

1. **S3 Source Bucket** to store Frontend Site Content

Under deployment, you can choose the name for S3 bucket to be provisioned
```yaml
deployment:
  target_bucket: polymer-bucket
```

2. **Cloudfront Distribution** to serve content. This content delivery network (CDN) distributes content to edge locations worldwide, optimizing load times and user experiences.

Under deployment, you can choose the [price class](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html) and domain configuration for Cloudfront
```yaml
deployment:
  cloudfront:
    price_class: PriceClass_200 # PriceClass_All , PriceClass_200, PriceClass_100
  domain: # optional
    zone_id: Z123456789123D
    aliases:
      - polymerism.polymer.com
    viewer_certificate: arn:aws:acm:us-east-1:123456789
```

## Installation

1. Create a new Gatsby Application with the PolymerFront Framework
```shell
gatsby new your_application_name https://github.com/algebananazzzzz/PolymerFront
```

For instructions on installing Gatsby Client, [read more](https://www.gatsbyjs.com/docs/tutorial/getting-started/part-0/)
```shell
npm install -g gatsby-cli
```


2. Develop your React application
```shell
cd your_application_name/
gatsby develop
```

## Deployment

1. **Build Production Sites**
Execute the following command to build production-ready sites using Gatsby:
```shell
gatsby build
```

2. **Create a GitHub Repository:**
Start by creating a GitHub repository. After that, follow these steps to initialize Git and switch to the `dev` branch:
```
git init
git add -A
git commit
git checkout -b dev
git remote set-url origin https://github.com/{your_repository_name}.git
```

3. **Configure Secrets and Variables:**

For secure and streamline access to AWS and Terraform Cloud, follow these steps to configure secrets and variables within your GitHub repository:

- Click on the `Settings` tab within your repository.
- Navigate to `Secrets` (or `Environments` > `Secrets` depending on your GitHub version).
- Click on `New repository secret` to add secrets or `New repository variable` to add variables.

**Required Secrets:**

1. `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
2. `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.
3. `TF_API_TOKEN`: Obtain this token by going to your [Terraform Cloud tokens page](https://app.terraform.io/app/settings/tokens).

**Required Variables:**

1. `APPLICATION_NAME`: Set your application's name.
2. `AWS_REGION`: Define the AWS region you're working with.
3. `TF_ORGANISATION`: If not already created, create a Terraform Cloud organization for use.

4. **Push to GitHub**
```shell
git push --set-upstream origin dev
```

With GitHub Actions in place, this push will automatically trigger Terraform Cloud to provision the necessary resources.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
[Provide a way for users to contact you, whether it's an email address, a link to your website, or social media profiles.]


## Contact

For inquiries and further information, feel free to reach out to me through my [portfolio page](https://www.algebananazzzzz.com).
