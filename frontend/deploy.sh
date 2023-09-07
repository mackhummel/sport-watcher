#!/bin/bash
set -e

APP_BUCKET_NAME=sport-watcher-bucket-prod

echo "Testing AWS CLI"
aws sts get-caller-identity

npm run build;

aws s3 sync build/ s3://$APP_BUCKET_NAME/

echo -e "\n\n"