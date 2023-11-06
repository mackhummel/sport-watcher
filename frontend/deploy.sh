#!/bin/bash
set -e

helpFunction()
{
   echo ""
   echo "Usage: $0 -b s3_bucket_name"
   exit 1
}

while getopts "b:" opt
do
   case "$opt" in
      b ) parameterB="$OPTARG" ;;
      ? ) helpFunction ;;
   esac
done

if [ -z "$parameterB" ]
then
   echo "No S3 Bucket Specified";
   helpFunction
fi

APP_BUCKET_NAME=$parameterB

echo "Testing AWS CLI"
aws sts get-caller-identity

npm run build;

aws s3 sync build/ s3://$APP_BUCKET_NAME/

echo -e "\n\n"