# sport-watcher
Web application for users to track the number of lifetime games watched over various professional and collegiate sports. 

## Back-End

** Must Have AWS SAM CLI and AWS Account **

Backend is written using Node.js and uses the AWS Serverless Applitcation Model(SAM) for writting infrastructure as code. These are the list of AWS Services used in this project: Cloudformation, S3, API Gateway, Lambda, DynamoDB, and Cognito.

### Deploying
`cd sport-watcher-stack/`

Deploy to specific environment (prod or staging):

`sam deploy --config-env <env>`


## Front-End
Built using React and Material UI components. Uses AWS amplify for authentication and Axios for http requests.

### Deploying
`cd frontend/`

Using the S3 bucket name created from SAM deploy:

`./deploy.sh -b s3_bucket_name`

