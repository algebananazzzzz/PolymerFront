# PolymerFront

PolymerFront is part of the Polymer framework, a DevOps framework created to provide developers with a framework empowering them to concentrate on what they do best – writing code and developing their applications. This is achieved through these steps:

1. Simplify the configuration process in provisioning resources by utilizing a single concise "Source-of-Truth" in the `stage.env.yml` files.
2. Establish robust CI/CD pipelines with GitHub Actions for seamless, automated deployments.
3. Minimize need for constant maintenance by provisioning Serverless AWS resources.


## Templates
Each template is designed with distinct integrations to fulfill specific purposes:

1. [PolymerBase repository](https://github.com/algebananazzzzz/PolymerBase) - for developing Backend resources e.g. GraphQL APIs and Cognito Pools
3. [PolymerFront repository](https://github.com/algebananazzzzz/PolymerFront) - for creating React applications with GraphQL and Amplify integrations
4. [PolymerFront-lite repository](https://github.com/algebananazzzzz/PolymerFront-lite) - lite version of PolymerFront

I highly recommend viewing [my blog](https://algebananazzzzz.com/blog/polymer) for a more comprehensive guide.
maintenance

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
  - [Configuration file locations](#configuration-file-locations)
  - [Types of Configuration](#types-of-configuration)
- [Usage](#usage)
  - [Editing Auth Page Content](#editing-authentication-flow-page-content)
  - [Toggling Dark Mode](#toggling-dark-mode)
  - [Using Informational Toasts](#using-informational-toasts)
  - [Amplify and Apollo-Client](#amplify-and-apollo-client-integration)
- [Deployment](#deployment)
  - [Using GitHub Actions](#using-gitHub-actions-(recommended))
  - [Using Terraform Locally](#using-terraform-locally)
- [License](#license)
- [Contact](#contact)


## About

PolymerFront specialises in creating Robust React applications with Gatsby, with integrations with the **AWS Amplify** package and **prebuilt authentication flow**, **inbuilt dark theme and toast feature** suitable for Full-Stack Applications.


## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:
  
1. **Node.js and npm**: To develop and build the project, you need to have Node.js and npm (Node Package Manager) installed.

  - **Node.js**: Download from [the official Node.js website](https://nodejs.org/). We recommend using Node.js version 14.17.0 or higher.
  - **NPM (Node Package Manager)**: NPM is usually included with Node.js installation. If NPM is not installed, you can download it from the [official npm website](https://www.npmjs.com/).


2. **Gatsby CLI**: This project uses Gatsby, so you'll need the Gatsby CLI (Command Line Interface) to manage and build your site. You can install it globally by running:
  
```shell
npm install -g gatsby-cli
```

### Installation

1. **Create a New Gatsby Project**:

Create a new project with Gatsby-CLI:

```shell
gatsby new MyProject https://github.com/algebananazzzzz/PolymerFront.git
```

## Configuration

### Configuration file locations

Configuration is stored in YAML files specific to CI/CD staging environments. The configuration files must follow the naming convention `{stage}.env.yml`. For local development (gatsby develop), the configuration is sourced from `.polymer/.gatsbyconfig/development.env.yml` instead:

```
|-- .polymer
|   |-- .config
|   |   |-- dev.env.yml # for dev stage
|   |   |-- test.env.yml
|   |   |-- prod.env.yml|   |-- .gatsbyconfig
|   |   |-- development.env.yml # gatsby develop
|   |   |-- example.env.yml # example configuration file
|   |-- .gatsbyconfig
|   |   |-- development.env.yml # gatsby develop
|   |   |-- example.env.yml # example configuration file
|-- other files and directories
```

Please view the example configuration file for [staging environments](.polymer/.config/example.env.yml) and [local development](.polymer/.gatsbyconfig/example.env.yml) to understand how to configure configuration files. The comments within the file provide detailed explanations of what each field configures.

### Types of Configuration

1. **Resource configuration**: Encompasses settings for CloudFront and S3 origin resources used to make the site available, including domain customization.

2. **Application Configuration**: Includes options for configuring AWS Amplify and variables used in your application. This includes Cognito user and identity pool IDs, Apollo Client configuration, and the S3 data bucket name.

## Usage

To develop Gatsby locally, start the Gatsby development server by running:

```shell
gatsby develop
```

### Editing Authentication Flow Page Content

PolymerFront includes a built-in authentication flow powered by the AWS Amplify Auth package. The page routing for authentication can be located in [src/pages/auth/[...].js](src/pages/auth/[...].js), while custom authentication components are stored in the [src/components/auth](src/components/auth) directory. Additionally, the prebuilt navbars included in PolymerFront offer redirect links to the auth pages. Finally, under [src/components/auth](src/components/auth), there are **ProtectedRoute** and **AuthRoute** components that you can use to route users to application routes or public routes respectively.

You can customize and edit the authentication flow page content to match your application's requirements, through the .[polymer/content/auth.content.yml](.polymer/content/auth.content.yml) file.

### Toggling Dark Mode 

PolymerFront offers a convenient dark mode feature. The dark mode functionality is provided through a context provider located at `src/components/theme/theme-context.js` and a dark mode toggler component found at `src/components/theme/dark-toggler.js`. To toggle dark mode in your application:


```jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../theme/theme-context';
import ThemeToggler from '../theme/dark-toggler';

function Page() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div className="dark:bg-slate-900">
      <ThemeToggler theme={theme} changeTheme={changeTheme} />
    </div>
  );
}
```

### Using Informational Toasts

PolymerFront offers a convenient toast feature. The functionality is provided through a context provider located at `src/components/toast/toast-context.js`. To add or remove toasts in your application:


```jsx
import React, { useContext, useState } from 'react';
import { ToastContext } from '../toast/toast-context'

function Page() {
  const [toastId, settoastId] = useState(null)
  const { toasts, addToast, removeToast } = useContext(ToastContext)

  const handleToasts = () => {
    if (toastId) {
      removeToast(toastId)
      settoastId(null)
    } else {
      const _id = addToast(message="New Toast!", type = 'info', timeout = 5000)
      settoastId(_id)
    }
  }

  return (
    <div className="dark:bg-slate-900">
      {console.log(toasts)}
      <button onClick={handleToasts}/>
    </div>
  );
}
```

### Amplify and Apollo-Client Integration

Under the application configuration, PolymerFront has been configured with Amplify variables to enhance aspects of your application:

- **Authentication**: Amplify simplifies user authentication and authorization, making it easy to securely manage user attributes. Learn more in the [Amplify Authentication documentation](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js).

- **Storage**: Amplify seamlessly integrates with Amazon S3, offering scalable and secure file storage capabilities, simplifying the management of user uploads and media assets. Explore more in in the [Amplify Storage documentation](https://docs.amplify.aws/lib/storage/getting-started/q/platform/js).

PolymerFront also integrates with **[ApolloClient](https://www.apollographql.com/docs/react)** using the [gatsby-plugin-apollo](https://www.gatsbyjs.com/plugins/gatsby-plugin-apollo) plugin, providing a robust platform for efficient communication with GraphQL APIs and streamlined data management.

## Deployment

### Using GitHub Actions (Recommended)

1. **Create a GitHub Repository:**
Start by creating a GitHub repository. After that, follow these steps to initialize Git and switch to the `dev` branch:
```
git init
git add -A
git commit
git checkout -b dev
git remote set-url origin https://github.com/{your_repository_name}.git
```

2. **Configure Secrets and Variables:**

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

3. **Push to GitHub**
```shell
git push --set-upstream origin dev
```

With GitHub Actions in place, this push will automatically trigger the following processes:

- Webpack will bundle your Node.js code, optimizing it for production deployment.

- If a workspace for your organization doesn't already exist, Terraform Cloud will create one.Terraform Cloud will then be triggered to provision the necessary resources according to your infrastructure configuration. 


4. **Staging**

After a successful deployment of the dev branch, you can extend the same workflow to deploy your application to other stages, such as **test** or **production**. Follow these steps for each stage:

- Create a new branch corresponding to the stage you want to deploy (e.g., `test`, `prod`).
- Merge the `dev` branch into the newly created stage branch. 

This push to the stage branch will automatically trigger GitHub Actions to provision resources for the specified stage. Repeat these steps for each stage as needed, allowing you to deploy your application to multiple environments seamlessly.


### Using Terraform Locally

If you prefer to use Terraform locally and avoid pushing code to GitHub, you can follow these steps. This approach offers several benefits, including greater control and flexibility over your infrastructure provisioning.

1. **Check Terraform Version**:

    After downloading Terraform, verify its version to ensure it's correctly installed:

     ```shell
     terraform -v
     ```
     
2. **Update terraform.tf Configuration**:

Modify the `terraform.tf` configuration file to specify the required Terraform version under the `required_version` block, and comment out the "cloud" block:

```hcl
terraform {
  required_version = "~>1.5.0"

    # cloud {
    #   workspaces {
    #     tags = ["github-actions"]
    #   }
    # }

  # Other configuration settings...
}
```

3. **Specify Staging Environment**:

To define the staging environment you intend to work with, set the `STAGE` variable:

```shell
export STAGE=dev
```

4. **Terraform Init, Plan and Apply**:

```shell
terraform init
terraform plan
terraform apply --auto-approve
```

5. **Gatsby Build and Deploy**

After the necessary resources are deployed, run Gatsby Build to create optimized static assets for your site, then use the npm deploy script to push the assets to Amazon S3 via the gatsby-plugin-s3:

```shell
gatsby build 
npm run deploy
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
[Provide a way for users to contact you, whether it's an email address, a link to your website, or social media profiles.]


## Contact

For inquiries and further information, feel free to reach out to me through my [portfolio page](https://www.algebananazzzzz.com).
