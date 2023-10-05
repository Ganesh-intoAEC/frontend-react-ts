import { Duration } from "aws-cdk-lib";
import { LambdaDefinition, CDKContext } from "../../types";
import { NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";

// Constants
const DEFAULT_LAMBDA_MEMORY_MB = 256;
const DEFAULT_LAMBDA_TIMEOUT_MINS = 1;

// Returns lambda definitions with custom env
export const getLambdaDefinitions = (
  context: CDKContext,
  stage: string
): LambdaDefinition[] => {
  const lambdaDefinitions: LambdaDefinition[] = [
    {
      name: "signup",
      environment: {
        REGION: context.region,
        NODE_ENV: stage.split(`-`).length > 0 ? stage.split(`-`)[1] : stage,
        GIT_BRANCH: context.branchName,
        DB_NAME: context.dbName,
        DB_PASSWORD: context.dbPassword,
        DB_ACCESS_KEY: context.dbAccessKey,
        DB_PORT: context.dbPort,
        REDIS_HOST: context.redisHost,
        REDIS_PORT: context.redisPort,
        DB_HOST: context.dbHost,
        CLOUD_ACCESS_ID: context.cloudAccessId,
        CLOUD_SECRET_KEY: context.cloudSecretKey,
        USERHUB_ACCESS_KEY: context.userhubAccessKey,
        COGNITO_USER_POOL_ID: context.cognitoUserPoolId,
        COGNITO_CLIENT_ID: context.cognitoClientId,
        COGNITO_SECRET_HASH: context.cognitoSecretHash,
      },
      isPrivate: true,
      api: {
        path: `/signup`,
        methods: "POST",
      },
    },
    {
      name: "manage-session",
      environment: {
        REGION: context.region,
        NODE_ENV: stage.split(`-`).length > 0 ? stage.split(`-`)[1] : stage,
        GIT_BRANCH: context.branchName,
        DB_NAME: context.dbName,
        DB_PASSWORD: context.dbPassword,
        DB_ACCESS_KEY: context.dbAccessKey,
        DB_PORT: context.dbPort,
        DB_USER: context.dbUser,
        REDIS_HOST: context.redisHost,
        REDIS_PORT: context.redisPort,
        DB_HOST: context.dbHost,
        CLOUD_ACCESS_ID: context.cloudAccessId,
        CLOUD_SECRET_KEY: context.cloudSecretKey,
        USERHUB_ACCESS_KEY: context.userhubAccessKey,
        COGNITO_USER_POOL_ID: context.cognitoUserPoolId,
        COGNITO_CLIENT_ID: context.cognitoClientId,
        COGNITO_SECRET_HASH: context.cognitoSecretHash,
      },
      isPrivate: true,
      api: {
        path: `/session`,
        methods: "POST",
      },
    },
    {
      name: "profile",
      environment: {
        REGION: context.region,
        NODE_ENV: stage.split(`-`).length > 0 ? stage.split(`-`)[1] : stage,
        GIT_BRANCH: context.branchName,
        DB_NAME: context.dbName,
        DB_PASSWORD: context.dbPassword,
        DB_ACCESS_KEY: context.dbAccessKey,
        DB_PORT: context.dbPort,
        DB_USER: context.dbUser,
        REDIS_HOST: context.redisHost,
        REDIS_PORT: context.redisPort,
        DB_HOST: context.dbHost,
        CLOUD_ACCESS_ID: context.cloudAccessId,
        CLOUD_SECRET_KEY: context.cloudSecretKey,
        USERHUB_ACCESS_KEY: context.userhubAccessKey,
        COGNITO_USER_POOL_ID: context.cognitoUserPoolId,
        COGNITO_CLIENT_ID: context.cognitoClientId,
        COGNITO_SECRET_HASH: context.cognitoSecretHash,
      },
      isPrivate: true,
      api: {
        path: `/profile`,
        methods: "POST",
      },
    },
  ];
  return lambdaDefinitions;
};

// Returns Lambda Function properties with defaults and overwrites
export const getFunctionProps = (
  lambdaDefinition: LambdaDefinition,
  lambdaRole: iam.Role,
  context: CDKContext
): NodejsFunctionProps => {
  const functionProps: NodejsFunctionProps = {
    functionName: `${context.appName}-${lambdaDefinition.name}-${context.environment}`,
    //handler: `../../src/components/${lambdaDefinition.name}/${lambdaDefinition.name}/handler`,
    entry: `handlers/${lambdaDefinition.name}.ts`,
    runtime: lambda.Runtime.NODEJS_18_X,
    memorySize: lambdaDefinition.memoryMB
      ? lambdaDefinition.memoryMB
      : DEFAULT_LAMBDA_MEMORY_MB,
    timeout: lambdaDefinition.timeoutMins
      ? Duration.minutes(lambdaDefinition.timeoutMins)
      : Duration.minutes(DEFAULT_LAMBDA_TIMEOUT_MINS),
    environment: lambdaDefinition.environment,
    role: lambdaRole,
  };
  return functionProps;
};
