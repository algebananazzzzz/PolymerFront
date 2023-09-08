import React from "react"
import HomeLayout from "../components/layout/home-layout"

const IndexPage = () => {
  return (
    <HomeLayout>
      <body class="min-h-screen dark:bg-slate-900">
        <div class="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto space-y-5 lg:space-y-8">
          <h3 className="text-3xl pt-7 lg:pt-10 font-semibold dark:text-white">Welcome to PolymerFront!</h3>
          <div className="space-y-3">
            <h4 className="text-2xl font-semibold dark:text-white">Configuration</h4>
            <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 text-justify">
              Configuration is stored in YAML files specific to CI/CD staging environments found in <b>`.polymer/.config`</b> that adhere to the format <b>&#123;stage&#125;.env.yml</b>. For local development (gatsby develop), the configuration is sourced from <b>`.polymer/.gatsbyconfig/development.env.yml`</b> instead.
            </p>
            <pre className="text-sm">
              <code className="text-gray-800 dark:text-gray-200">
                {`|-- .polymer
|   |-- .config
|   |   |-- dev.env.yml # for dev stage
|   |   |-- test.env.yml
|   |   |-- prod.env.yml
|   |   |-- example.env.yml # example configuration file
|   |-- .gatsbyconfig
|   |   |-- development.env.yml # gatsby develop
|   |   |-- example.env.yml # example configuration file
|-- other files and directories
`}
              </code>
            </pre>
            <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 text-justify">
              Configuration follows a single format, and consists of two key aspects:
            </p>
            <ul className="list-decimal list-outside space-y-3 pl-5 text-base md:text-lg text-gray-800 dark:text-gray-200 text-justify">
              <li className="pl-2">
                <b>Resource Configuration</b>: configuration options for the CloudFront and S3 origin resources deployed to make site available e.g. domain customisation.
              </li>
              <li className="pl-2">
                <b>Application Configuration</b>: configuration options for variables used in your application, including Cognito user and identity pool IDs, Apollo Client configuration, and S3 data bucket name.
              </li>
            </ul>
            <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 text-justify">
              Please refer to the <b>example.env.yml</b> for a well-commented example of configuration, and what the arguments represent.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-2xl font-semibold dark:text-white">Integrations</h4>
            <ul className="list-decimal list-outside space-y-3 pl-5 text-base md:text-lg text-gray-800 dark:text-gray-200 text-justify">
              <li className="pl-2">
                <b>The <a href="https://www.gatsbyjs.com/" target="blank" className="text-blue-600 decoration-2 hover:underline">GatsbyJS</a> Framework</b> to bundle React applications into static files for production (within GitHub Actions).
              </li>
              <li className="pl-2">
                <b><a href="https://docs.amplify.aws/lib/q/platform/js/" target="blank" className="text-blue-600 decoration-2 hover:underline">Amplify</a> Auth and Content</b> packages to enable smooth interaction with Cognito Identity and User pools, and using S3 buckets for storing, retrieving user data and resources.
              </li>
              <li className="pl-2">
                <b><a href="https://www.apollographql.com/docs/react/" target="blank" className="text-blue-600 decoration-2 hover:underline">Apollo-Client</a></b> integration through <b>gatsby-plugin-apollo</b> to provide a robust platform for efficient communication with GraphQL APIs and streamlined data management.
              </li>
              <li className="pl-2">
                <b><a href="https://tailwindcss.com/" target="blank" className="text-blue-600 decoration-2 hover:underline">TailWindCSS</a></b> and <b>Preline</b> to enhance your styling capabilities. To add your custom styles, navigate to <b>`src/styles/global.css`</b>.
              </li>
              <li className="pl-2">
                <b>Built-in authentication flow</b> pages and components seamlessly integrated with the Amplify Auth package. They are located at <b>`/src/components/auth`</b> and <b>`/src/pages/auth/[...].js`</b>, and can be configured in <b>`.polymer/content/auth.content.yml`</b>.
              </li>
            </ul>

          </div>
          <h3 className="text-3xl pt-7 lg:pt-10 font-semibold dark:text-white">Deployment</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-2xl font-semibold dark:text-white">1. Create and initialise Git</h4>
            </div>
            <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 text-justify">
              After creating a GitHub Repository, perform the following steps
            </p>
            <pre className="text-sm">
              <code className="text-gray-800 dark:text-gray-200">
                {`git init
git add -A
git commit
git checkout -b dev
git remote set-url origin https://github.com/{your_repository_name}.git`}
              </code>
            </pre>
          </div>

          <div className="space-y-3 pt-3 lg:pt-5">
            <h4 className="text-2xl font-semibold dark:text-white">2. Configure Action Secrets and Variables</h4>
            <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 text-justify">
              For secure and streamline access to AWS and Terraform Cloud, follow these steps to configure secrets and variables within your GitHub repository:
            </p>
            <ul className="list-disc list-outside space-y-3 pl-5 text-base md:text-lg text-gray-800 dark:text-gray-200 text-justify">
              <li className="pl-2">
                Click on the Settings tab within your repository.
              </li>
              <li className="pl-2">
                Navigate to Secrets (or Environments &gt; Secrets depending on your GitHub version).
              </li>
              <li className="pl-2">
                Click on New repository secret to add secrets or New repository variable to add variables.
              </li>
            </ul>
            <div className="space-y-2 pt-3">
              <h5 className="text-xl font-semibold dark:text-white">Required Secrets:</h5>
              <ul className="list-decimal list-outside space-y-3 pl-5 text-base md:text-lg text-gray-800 dark:text-gray-200 text-justify">
                <li className="pl-2">
                  <b>AWS_ACCESS_KEY_ID</b>: Your AWS access key ID.
                </li>
                <li className="pl-2">
                  <b>AWS_SECRET_ACCESS_KEY</b>: Your AWS secret access key.
                </li>
                <li className="pl-2">
                  <b>TF_API_TOKEN</b>: Obtain this token by going to your Terraform Cloud tokens page.
                </li>
              </ul>

              <h5 className="pt-3 text-xl font-semibold dark:text-white">Required Variables:</h5>
              <ul className="list-decimal list-outside space-y-3 pl-5 text-base md:text-lg text-gray-800 dark:text-gray-200 text-justify">
                <li className="pl-2">
                  <b>APPLICATION_NAME</b>: Set your application's name.
                </li>
                <li className="pl-2">
                  <b>AWS_REGION</b>: Define the AWS region you're working with.
                </li>
                <li className="pl-2">
                  <b>TF_ORGANISATION</b>: Terraform Cloud organization where the workspace will be created.
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3 pt-3 lg:pt-5">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-2xl font-semibold dark:text-white">3. Push to GitHub, let it run!</h4>
            </div>
            <pre className="text-sm">
              <code className="text-gray-800 dark:text-gray-200">
                {`git push --set-upstream origin dev`}
              </code>
            </pre>
            <p className="text-base md:text-lg text-gray-800 dark:text-gray-200 text-justify">
              With GitHub Actions in place, this push will automatically build necessary artifacts and trigger Terraform to provision the necessary resources.
            </p>
          </div>
        </div>

      </body>
    </HomeLayout>
  )
}

export default IndexPage

export const Head = () => <title>PolymerFront</title>